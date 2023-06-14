'use client';
import MenuItem from '@/src/components/Blueprint/Menu/MenuItem';
import EC2 from '@/src/components/AWSService/EC2';
import useServiceStore from '@/src/hooks/useServiceStore';
import { IService } from '@/src/types';
const MenuBar = () => {
  const { services, addService, removeService, selectedServiceId } = useServiceStore();
  return (
    <div className='w-80 min-w-fit h-full border-r-2 border-[#195091]-100'>
      <div>{selectedServiceId}</div>
      <MenuItem
        name='ec2'
        onClick={() =>
          addService({
            id: services.length + 1,
            type: 'ec2',
            x: services.length + 1,
            y: services.length + 1,
          })
        }
      />
      <MenuItem
        name='rds'
        onClick={() =>
          addService({
            id: services.length + 1,
            type: 'ec2',
            x: 0,
            y: 0,
          })
        }
      />
      <MenuItem name='cloudFront' onClick={() => {}} />
    </div>
  );
};

export default MenuBar;
