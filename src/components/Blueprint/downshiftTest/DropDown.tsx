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
    <div className='m-3 max-w-sm '>
      <div className='flex justify-between text-center' onClick={() => setShowDropdown(!showDropdown)}>
        <label className='text-lg font-bold'>{title}</label>
        <div>
          <FontAwesomeIcon
            className={`h-4 transition-transform duration-300 ${showDropdown ? 'transform rotate-180' : ''}`}
            icon={faChevronDown}
          />
        </div>
      </div>
      <div
        className={`${absolute ? 'absolute right-2' : ''} overflow-hidden transition-height duration-300 ${
          showDropdown ? 'h-auto' : 'h-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropDown;
