import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  show?: boolean;
  title: string;
  absolute: boolean;
  children: React.ReactNode;
}

const DropDown = ({ title, children, absolute }: IProps) => {
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div className='mt-8 ml-5'>
      <div className='flex justify-between text-center' onClick={() => setShowDropdown(!showDropdown)}>
        <label className='text-[12px] font-semibold'>{title}</label>
        <div className='mr-2'>
          <FontAwesomeIcon
            className={`h-[4px] w-[8px] transition-transform duration-300 ${
              showDropdown ? 'transform rotate-180' : ''
            }`}
            icon={faChevronDown}
          />
        </div>
      </div>
      <div
        className={`${absolute ? 'absolute right-2' : ''} overflow-hidden h-0 transition-all ease-in duration-300 ${
          showDropdown ? 'h-auto' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
