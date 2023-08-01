import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation';

import { ServiceOptions } from '@/src/types/Services';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';

interface IProps {
  option: ServiceOptions;
  active: boolean;
}

const EC2Info = ({ option, active }: IProps) => {
  const pathName = usePathname();
  const [showOptions, setShowOptions] = useState(true);
  const [disableEvent, setDisableEvent] = useState(false);
  const setTargetInstanceId = useDeployStore((state) => state.DeployAction.setTargetInstanceId);
  const onClickArea = () => {
    if (!disableEvent) setTargetInstanceId(showOptions ? '' : option.id);
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

  return (
    <div>
      <div
        className={`p-2 w-full h-fit flex justify-between text-center ${active ? 'bg-[#799ACF]' : ''}  text-white`}
        onClick={onClickArea}
      >
        <label className={`text-lg h-fit ${showOptions ? '' : 'text-black'}`}>{option.instanceName}</label>
        <div className='flex items-center'>
          <FontAwesomeIcon
            className={`h-full transition-transform duration-300 ${
              showOptions ? '' : 'transform rotate-180 text-black'
            }`}
            icon={faChevronUp}
          />
        </div>
      </div>
      {showOptions && (
        <div className='text-black p-2'>
          <div>Subnet : {option.subnetType}</div>
          <div>Availability Zone : {option.availabilityZone}</div>
        </div>
      )}
    </div>
  );
};

export default EC2Info;
