'use client';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useParams } from 'next/navigation';

import { Menus } from '@/src/assets/Menus';
import DropDown from '@/src/components/Blueprint/downshiftTest/DropDown';
import ServiceItemWrapper from '@/src/components/Blueprint/Menu/Blueprint/ServiceItemWrapper';
import { ExportSvg, getSvgBlob } from '@/src/utils/ExportSvg';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { AreaItemList } from '@/src/assets/MenuItems';
import AreaItemWrapper from '@/src/components/Blueprint/Menu/Blueprint/AreaItemWrapper';
import ConfirmPopover from '@/src/components/common/Popover/ConfirmPopover';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import { postBlueprintData } from '@/src/api/blueprint';

const Title = ({ title }: { title: string }) => (
  <div className='w-full h-16 text-lg flex items-center mx-4 mt-2'>{title}</div>
);

const BlueprintMenuList = () => {
  const params = useParams();
  const id = params.id;
  const userBlueprintsIds = useAuthStore((state) => state.userBlueprintsIds);
  const [apiLoading, setApiLoading] = useState(false);
  const [saved, setSaved] = useState(userBlueprintsIds.includes(id));
  const { blueprintToJson, setBlueprintScope } = useBlueprintStore((state) => state.CommonAction);
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const scope = useBlueprintStore((state) => state.blueprintScope[currentBlueprintInfo.uuid]);
  const options = useBlueprintStore((state) => state.options);

  const onClickSaveConfirm = async () => {
    setApiLoading(true);
    try {
      const body = blueprintToJson({
        id: currentBlueprintInfo.uuid,
        name: currentBlueprintInfo.name,
        scope: currentBlueprintInfo.scope,
      });
      body.components.map((component, index) => {
        component.options = options[component.id];
      });
      body.scope = scope;
      const encodedSVG = getSvgBlob();
      body['svgFile'] = encodedSVG;
      await postBlueprintData(body);
      setSaved(true);
    } catch (e) {
      setSaved(false);
    }
    setApiLoading(false);
  };

  return (
    <div className='overflow-x-hidden w-[300px] min-w-[300px] h-full border-r-2 border-[#195091]-100 overflow-scroll select-none'>
      <Title title='Scope' />
      <div className='text-sm text-gray-500 mx-4 -mt-2 mb-4'>공개 범위를 설정하세요!</div>
      <label className='relative inline-flex items-center cursor-pointer mx-4'>
        <input
          type='checkbox'
          value=''
          className='sr-only peer'
          checked={scope === 'PUBLIC'}
          onChange={() => {
            setBlueprintScope(currentBlueprintInfo.uuid, scope === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC');
          }}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 mr-4"></div>
        <div>{scope}</div>
      </label>
      <Title title='Actions' />
      <div className={`text-sm mx-4 -mt-4 mb-2 ${saved ? 'text-green-700' : 'text-red-600'}`}>
        {saved ? 'Saved!' : 'Not saved'}
      </div>
      <div className='flex justify-center gap-4 mb-5'>
        <ConfirmPopover
          Heading={'Confirm Save'}
          Description={'Your architecture will be saved.(not Deployed)'}
          onClickConfirm={onClickSaveConfirm}
        >
          <div className='px-4 py-2 w-fit flex gap-2 items-center border-[#195091] border-solid border-2 rounded-xl cursor-pointer'>
            <FontAwesomeIcon className={`${apiLoading ? 'animate-spin' : ''}`} icon={faFloppyDisk} />
            Save
          </div>
        </ConfirmPopover>

        <div
          className='px-4 py-2 w-fit flex gap-2 bg-[#195091] items-center text-white rounded-xl cursor-pointer'
          onClick={ExportSvg}
        >
          <FontAwesomeIcon icon={faPalette} />
          <input type='file' id='fileInput' className='hidden' />
          Export
        </div>
      </div>
      <DropDown title={'Areas'} key={'Areas'} absolute={false}>
        {AreaItemList.map((AreaItem) => (
          <AreaItemWrapper key={AreaItem.name} type={AreaItem.type} name={AreaItem.name} scope={AreaItem.scope} />
        ))}
      </DropDown>
      {Menus.map((menu) => (
        <DropDown title={menu.title} key={menu.title} absolute={false}>
          <ServiceItemWrapper type={menu.title} />
        </DropDown>
      ))}
    </div>
  );
};

export default BlueprintMenuList;
