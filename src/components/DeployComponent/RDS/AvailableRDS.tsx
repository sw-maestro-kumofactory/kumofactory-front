'use client';
import React, { useEffect, useState } from 'react';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import RDSInfo from '@/src/components/DeployComponent/RDS/RDSInfo';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';

const AvailableRDS = () => {
  const services = useBlueprintStore((state) => state.services);
  const currentBlueprintId = useBlueprintStore((state) => state.currentBlueprintId);
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);
  const setTargetInstanceId = useDeployStore((state) => state.DeployAction.setTargetInstanceId);
  const setTargetInstanceType = useDeployStore((state) => state.DeployAction.setTargetInstanceType);
  const [rdsList, setRdsList] = useState<string[]>([]);

  useEffect(() => {
    Object.keys(services[currentBlueprintId]).forEach((key) => {
      if (services[currentBlueprintId][key].type === 'RDS_MYSQL') {
        setRdsList((prev) => [...prev, key]);
      }
    });
  }, []);

  return (
    <div className='w-full'>
      {rdsList.map((rds) => {
        return (
          <RDSInfo
            active={targetInstanceId === rds}
            key={rds}
            name={rds}
            onClick={() => {
              setTargetInstanceId(targetInstanceId === rds ? '' : rds);
              setTargetInstanceType(targetInstanceId === rds ? '' : 'RDS');
            }}
          />
        );
      })}
    </div>
  );
};

export default AvailableRDS;
