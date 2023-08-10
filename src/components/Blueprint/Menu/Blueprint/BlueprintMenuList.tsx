'use client';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

import { regionList } from '@/src/assets/RegionList';
import { Menus } from '@/src/assets/Menus';
import DropDown from '@/src/components/Blueprint/downshiftTest/DropDown';
import ServiceItemWrapper from '@/src/components/Blueprint/Menu/Blueprint/ServiceItemWrapper';
import { postTemplateData } from '@/src/api/template';
import { ExportSvg, getSvgBlob } from '@/src/utils/ExportSvg';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { AreaItemList } from '@/src/assets/MenuItems';
import AreaItemWrapper from '@/src/components/Blueprint/Menu/Blueprint/AreaItemWrapper';

const Title = ({ title }: { title: string }) => (
  <div className='w-full h-16 text-lg flex items-center mx-4 mt-2'>{title}</div>
);

const BlueprintMenuList = () => {
  const blueprintToJson = useBlueprintStore((state) => state.CommonAction.blueprintToJson);
  const currentBlueprintId = useBlueprintStore((state) => state.currentBlueprintId);
  const scope = useBlueprintStore((state) => state.blueprintScope[currentBlueprintId]);
  const name = useBlueprintStore((state) => state.name);
  const options = useBlueprintStore((state) => state.options);

  const onClickSaveButton = async () => {
    try {
      const body = blueprintToJson({ id: currentBlueprintId, name: name });
      body.components.map((component, index) => {
        component.options = options[component.id];
      });
      const encodedSVG = getSvgBlob();
      body['svgFile'] = encodedSVG;
      await postTemplateData(body);
    } catch (e) {
      alert('Invalid Blueprint');
      console.log(e);
    }
  };

  return (
    <div className='overflow-x-hidden w-[300px] min-w-[300px] h-full border-r-2 border-[#195091]-100 overflow-scroll select-none'>
      <Title title='Actions' />
      <div className='flex justify-center gap-4 mb-5'>
        <div
          className='px-4 py-2 w-fit flex gap-2 items-center border-[#195091] border-solid border-2 rounded-xl cursor-pointer'
          onClick={onClickSaveButton}
        >
          <FontAwesomeIcon icon={faFloppyDisk} />
          Save
        </div>
        <div
          className='px-4 py-2 w-fit flex gap-2 bg-[#195091] items-center text-white rounded-xl cursor-pointer'
          onClick={ExportSvg}
        >
          <FontAwesomeIcon icon={faPalette} />
          <input type='file' id='fileInput' className='hidden' />
          Export
        </div>
      </div>
      <DropDown title={'REGION'} key={'region'} absolute={false}>
        <select className='appearance-none w-[220px] h-8 mx-4 mt-3 '>
          {regionList.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </DropDown>
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
