'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import DropDown from '@/src/components/Blueprint/downshiftTest/DropDown';
import EC2Info from '@/src/components/DeployComponent/Instances/EC2Info';

const AvailableInstances = () => {
  const services = useBlueprintStore((state) => state.services);
  const options = useBlueprintStore((state) => state.options);
  const [ec2List, setEc2List] = useState<string[]>([]);
  const [s3List, setS3List] = useState<string[]>([]);

  useEffect(() => {
    Object.keys(services).forEach((key) => {
      if (services[key].type === 'EC2') {
        setEc2List((prev) => [...prev, key]);
      }
      if (services[key].type === 'S3') {
        setS3List((prev) => [...prev, key]);
      }
    });
  }, []);

  // 1. 인스턴스 목록을 불러온다.
  // 2. 그 중 S3, EC2를 찾는다.
  // 3. 찾은 인스턴스를 렌더링한다.
  // 4. 이 인스턴스들의 Subnet, Region 정보를 보여줄 수 있는 Dropdown을 만든다.
  // 5. 이 인스턴스들을 선택하면, 해당 인스턴스의 정보를 보여준다.(이건 다른 컴포넌트에서)

  return (
    <div className='w-full h-fit'>
      <div>
        {ec2List.map((ec2) => {
          return (
            <EC2Info key={ec2} option={options[ec2]} />
            // <div className='flex items-center p-4 w-full h-fit bg-[#799ACF] text-[#FCF7F4] ' key={'asdf'}>
            //
            // </div>
          );
        })}
      </div>
      <div>
        {s3List.map((s3) => {
          return <div key={'asdf'}>{s3}</div>;
        })}
      </div>
    </div>
  );
};

export default AvailableInstances;
