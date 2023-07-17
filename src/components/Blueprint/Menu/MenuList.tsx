'use client';
import { regionList } from '@/src/assets/RegionList';
import { Menus } from '@/src/assets/Menus';
import DropDown from '@/src/components/Blueprint/downshiftTest/DropDown';
import MenuItems from '@/src/components/Blueprint/Menu/MenuItems';

const Title = ({ title }: { title: string }) => (
  <div className='w-full h-16 text-2xl flex items-center mx-4 mt-2'>{title}</div>
);

const MenuBar = () => {
  return (
    <div className=' overflow-x-hidden w-[380px] min-w-[380px] h-full border-r-2 border-[#195091]-100 overflow-scroll select-none'>
      <Title title='REGION' />
      <select className='appearance-none w-80 h-8 mx-4 my-2 '>
        {regionList.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      {Menus.map((menu) => (
        <DropDown title={menu.title} key={menu.title} absolute={false}>
          <MenuItems type={menu.title} />
        </DropDown>
      ))}
    </div>
  );
};

export default MenuBar;
