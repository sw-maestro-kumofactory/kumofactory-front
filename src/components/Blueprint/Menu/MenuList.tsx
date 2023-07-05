'use client';
import MenuItem from '@/src/components/Blueprint/Menu/ServiceItem';
import { regionList } from '@/src/assets/RegionList';
import AreaItem from '@/src/components/Blueprint/Menu/AreaItem';
import { useState } from 'react';

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
  const [value, setValue] = useState(50);
  return (
    <div className='w-80 min-w-fit h-full border-r-2 border-[#195091]-100 overflow-scroll select-none'>
      <div className='flex justify-center align-middle'>
        <input
          id='default-range'
          type='range'
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className='w-52 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-4'
        />
      </div>
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
      <Title title={'Visualization'} />
      <AreaItem key={'AZ'} type={'AZ'} />
    </div>
  );
};

export default MenuBar;
