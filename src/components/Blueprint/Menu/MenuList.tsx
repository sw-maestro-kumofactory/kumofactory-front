'use client';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

import { regionList } from '@/src/assets/RegionList';
import { Menus } from '@/src/assets/Menus';
import DropDown from '@/src/components/Blueprint/downshiftTest/DropDown';
import ServiceItemWrapper from '@/src/components/Blueprint/Menu/ServiceItemWrapper';
import { postTemplateData } from '@/src/api/template';
import { ExportSvg } from '@/src/utils/ExportSvg';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { AreaItemList } from '@/src/assets/MenuItems';
import AreaItemWrapper from '@/src/components/Blueprint/Menu/AreaItemWrapper';

const Title = ({ title }: { title: string }) => (
  <div className='w-full h-16 text-lg flex items-center mx-4 mt-2'>{title}</div>
);

const MenuBar = () => {
  const blueprintToJson = useBlueprintStore((state) => state.CommonAction.blueprintToJson);
  return (
    <div className='overflow-x-hidden w-[294px] min-w-[294px] h-full border-r-2 border-[#195091]-100 overflow-scroll select-none'>
      <Title title='Actions' />
      <div className='flex justify-center gap-4 mb-5'>
        <div
          className='px-4 py-2 w-fit flex gap-2 items-center border-[#195091] border-solid border-2 rounded-xl cursor-pointer'
          onClick={async () => {
            try {
              await postTemplateData(blueprintToJson());
            } catch (e) {
              alert('Invalid Blueprint');
              console.log(e);
            }
          }}
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
          <AreaItemWrapper key={AreaItem.name} type={AreaItem.type} name={AreaItem.name} />
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

export default MenuBar;
