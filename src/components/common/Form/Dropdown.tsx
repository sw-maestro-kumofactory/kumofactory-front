import { Dispatch, SetStateAction, useState } from 'react';

interface IProps<T> {
  value: T;
  setValue: (val: T) => void;
  options: T[];
}

const Dropdown = <T,>({ value, setValue, options }: IProps<T>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <div className='relative mt-2'>
          <button
            type='button'
            className='relative w-full cursor-default font-semibold text-[12px] rounded-md bg-white py-1.5 pr-10 text-left text-[#323438] shadow-sm ring-1 ring-inset ring-[#DAE2EC] focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 hover:bg-[#F7F8FC]'
            aria-haspopup='listbox'
            aria-expanded='true'
            aria-labelledby='listbox-label'
            onClick={() => setOpen(!open)}
          >
            <span className='flex items-center'>
              <span className='ml-3 block truncate'>{value as string}</span>
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
              <svg className='h-5 w-5 text-gray-400' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          </button>
          <ul
            className={`${
              open ? '' : 'hidden'
            } absolute z-10 max-h-56 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm `}
            role='listbox'
          >
            {options.map((option) => (
              <li
                key={option as string}
                className={`${
                  value === option ? 'bg-[#81929F] text-white' : 'hover:bg-[#F7F8FC] '
                } text-[#323438] relative cursor-default select-none py-2 pl-3 pr-9 `}
                id='listbox-option-0'
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
              >
                <div className='flex items-center'>
                  <span className='font-normal ml-3 block truncate'>{option as string}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
