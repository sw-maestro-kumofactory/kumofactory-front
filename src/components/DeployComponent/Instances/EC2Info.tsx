import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { ServiceOptions } from '@/src/types/Services';

interface IProps {
  option: ServiceOptions;
}

const EC2Info = ({ option }: IProps) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div>
      <div className='p-2 w-full h-fit flex justify-between text-center bg-[#799ACF] text-white'>
        <label className='text-lg h-fit'>{option.instanceName}</label>
        <div className='flex items-center'>
          <FontAwesomeIcon
            onClick={() => setShowOptions(!showOptions)}
            className={`h-full transition-transform duration-300 ${showOptions ? 'transform rotate-180' : ''}`}
            icon={faChevronDown}
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
