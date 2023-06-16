'use client';
import MenuItem from '@/src/components/Blueprint/Menu/MenuItem';
import EC2 from '@/src/components/AWSService/Service';
import useServiceStore from '@/src/hooks/useServiceStore';
import { IService } from '@/src/types';
const MenuBar = () => {
  const { services, addService, removeService, selectedServiceId } = useServiceStore();
  return (
    <div className='w-80 min-w-fit h-full border-r-2 border-[#195091]-100 overflow-scroll'>
      <MenuItem
        name='ec2'
        onClick={() =>
          addService({
            id: services.length + 1,
            type: 'EC2',
            x: 250,
            y: 50,
          })
        }
      />
      <MenuItem
        name='rds'
        onClick={() =>
          addService({
            id: services.length + 1,
            type: 'RDS',
            x: 0,
            y: 0,
          })
        }
      />
      <MenuItem
        name='Route53'
        onClick={() =>
          addService({
            id: services.length + 1,
            type: 'Route53',
            x: 0,
            y: 0,
          })
        }
      />
      <MenuItem
        name='s3'
        onClick={() =>
          addService({
            id: services.length + 1,
            type: 'S3',
            x: 0,
            y: 0,
          })
        }
      />
      <MenuItem
        name='waf'
        onClick={() =>
          addService({
            id: services.length + 1,
            type: 'WAF',
            x: 0,
            y: 0,
          })
        }
      />
    </div>
  );
};

export default MenuBar;
