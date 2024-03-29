import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

import { ServiceOptions } from '@/src/types/Services';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import { EC2Options } from '@/src/types/Services';
import { getRepoInfo } from '@/src/api/deploy';

interface IProps {
  option: EC2Options;
  active: boolean;
}

const EC2Info = ({ option, active }: IProps) => {
  const pathName = usePathname();
  const [showOptions, setShowOptions] = useState(true);
  const [disableEvent, setDisableEvent] = useState(false);
  const setTargetInstanceId = useDeployStore((state) => state.DeployAction.setTargetInstanceId);
  const setTargetInstanceName = useDeployStore((state) => state.DeployAction.setTargetInstanceName);
  const setTargetInstanceType = useDeployStore((state) => state.DeployAction.setTargetInstanceType);
  const addDeployStatusOfResource = useDeployStore((state) => state.DeployAction.addDeployStatusOfResource);
  const deployedResourceList = useDeployStore((state) => state.deployedResourceList);

  const onClickArea = () => {
    if (!disableEvent) {
      setTargetInstanceId(showOptions ? '' : option.id);
      setTargetInstanceName(showOptions ? '' : option.instanceName);
      setTargetInstanceType(showOptions ? '' : 'EC2');
    }
  };

  useEffect(() => {
    if (pathName.split('/').length >= 5) {
      setDisableEvent(true);
    } else {
      setDisableEvent(false);
    }
  }, []);

  useEffect(() => {
    setShowOptions(active);
  }, [active]);

  useEffect(() => {
    const source = new EventSource(`/api/build/buildStatus/${deployedResourceList[option.id].instanceId}`);
    source.addEventListener('open', () => {});
    source.addEventListener('status', (e) => {
      if (e.data === 'success' || e.data === 'fail') {
        addDeployStatusOfResource(option.id, e.data);
        source.close();
      }
    });
    source.addEventListener('error', (e) => {});
    return () => {
      if (source) source.close();
    };
  }, []);

  return (
    <div className={`${active ? 'bg-[#EAF0F4]' : 'hover:bg-[#F3F6F8]'} `}>
      <div
        className={`pl-[20px] py-[10px] w-full h-fit flex justify-between text-center text-[13px] ${
          active ? 'text-[#00C0B5]' : 'text-black'
        }`}
        onClick={onClickArea}
      >
        <label className={`h-fit font-semibold ${showOptions ? '' : 'text-black'}`}>{option.instanceName}(EC2)</label>
        <div className='flex w-[8px] h-[4px] items-center pr-[22px]'>
          <FontAwesomeIcon
            className={`h-full transition-transform duration-300 ${
              showOptions ? '' : 'transform rotate-180 text-black'
            }`}
            icon={faChevronUp}
          />
        </div>
      </div>
      {showOptions && (
        <div className='text-black'>
          <Info content={`Subnet : ${option.subnetType}`} />
          <Info content={`Availability Zone : ${option.availabilityZone}`} />
          <Info content={`Public IP : ${deployedResourceList[option.id]?.publicIp}`} />
        </div>
      )}
    </div>
  );
};

const Info = ({ content }: { content: string }) => {
  return <div className='pl-[30px] py-[10px] text-[12px]'>{content}</div>;
};

export default EC2Info;
