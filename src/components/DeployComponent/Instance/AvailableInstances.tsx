'use client';
import React, { useEffect, useState } from 'react';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import EC2Info from '@/src/components/DeployComponent/Instance/EC2Info';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import { EC2Options } from '@/src/types/Services';

const AvailableInstances = () => {
  const services = useBlueprintStore((state) => state.services);
  const options = useBlueprintStore((state) => state.options);
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);
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

  return (
    <div className='w-full h-fit'>
      <div>
        {ec2List.map((ec2) => {
          return (
            <EC2Info key={ec2} option={options[ec2] as EC2Options} active={targetInstanceId === options[ec2].id} />
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
