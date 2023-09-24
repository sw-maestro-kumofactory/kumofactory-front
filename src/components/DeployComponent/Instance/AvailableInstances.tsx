'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import EC2Info from '@/src/components/DeployComponent/Instance/EC2Info';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import { EC2Options } from '@/src/types/Services';

const AvailableInstances = () => {
  const services = useBlueprintStore((state) => state.services);
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const options = useBlueprintStore((state) => state.options);
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);
  const [ec2List, setEc2List] = useState<string[]>([]);
  const [s3List, setS3List] = useState<string[]>([]);

  useEffect(() => {
    Object.keys(services[currentBlueprintInfo.uuid]).forEach((key) => {
      if (services[currentBlueprintInfo.uuid][key].type === 'EC2') {
        setEc2List((prev) => [...prev, key]);
      }
      if (services[currentBlueprintInfo.uuid][key].type === 'S3') {
        setS3List((prev) => [...prev, key]);
      }
    });
  }, []);

  return (
    <div className='w-full'>
      <div>
        {ec2List.map((ec2) => {
          return (
            <EC2Info key={ec2} option={options[ec2] as EC2Options} active={targetInstanceId === options[ec2].id} />
          );
        })}
      </div>
      <div>
        {s3List.map((s3) => {
          return (
            <div key={s3} className={`p-2 w-full h-fit flex justify-between text-center text-white`}>
              <div className={`text-lg h-fit text-black`}>{s3}(S3)</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableInstances;
