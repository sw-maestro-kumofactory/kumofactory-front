import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
interface IProps {
  show?: boolean;
  title: string;
  children: React.ReactNode;
}
const DropDown = ({ title, children }: IProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className='m-4 max-w-sm'>
      <div className='flex justify-between text-center'>
        <label className={'text-2xl'}>{title}</label>
        <div>
          <FontAwesomeIcon
            className={`h-4 transition-transform duration-300 ${showDropdown ? 'transform rotate-180' : ''}`}
            onClick={() => setShowDropdown(!showDropdown)}
            icon={faChevronDown}
          />
        </div>
      </div>
      {showDropdown && <div className='mt-4 overflow-hidden transition-all duration-300'>{children}</div>}
    </div>
  );
};

export default DropDown;
