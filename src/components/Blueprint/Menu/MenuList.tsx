'use client';
import MenuItem from '@/src/components/Blueprint/Menu/MenuItem';
import { regionList } from '@/src/assets/RegionList';

const ServiceList = [
  {
    type: 'EC2',
  },
  {
    type: 'RDS',
  },
  {
    type: 'S3',
  },
];

const Title = ({ title }: { title: string }) => (
  <div className='w-full h-16 text-2xl flex items-center justify-center mt-2'>{title}</div>
);

const MenuBar = () => {
  return (
    <div className='w-80 min-w-fit h-full border-r-2 border-[#195091]-100 overflow-scroll select-none'>
      <Title title='REGION' />
      <select className=' appearance-none w-80 h-8 mx-4 my-2 '>
        {regionList.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <Title title={'SERVICE'} />
      {ServiceList.map((service) => (
        <MenuItem key={service.type} type={service.type} />
      ))}
    </div>
  );
};

export default MenuBar;
