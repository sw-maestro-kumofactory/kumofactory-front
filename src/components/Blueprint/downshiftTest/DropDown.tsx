import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  show?: boolean;
  title: string;
  children: React.ReactNode;
}

const DropDown = ({ title, children }: IProps) => {
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <div className='m-4 max-w-sm'>
      <div className='flex justify-between text-center'>
        <label className='text-2xl'>{title}</label>
        <div>
          <FontAwesomeIcon
            className={`h-4 transition-transform duration-300 ${showDropdown ? 'transform rotate-180' : ''}`}
            onClick={() => setShowDropdown(!showDropdown)}
            icon={faChevronDown}
          />
        </div>
      </div>
      <div className={`overflow-hidden transition-height duration-300 ${showDropdown ? 'h-auto' : 'h-0'}`}>
        {children}
      </div>
    </div>
  );
};

export default DropDown;
