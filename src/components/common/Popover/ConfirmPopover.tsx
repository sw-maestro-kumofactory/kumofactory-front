import { useState } from 'react';

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeading,
  PopoverTrigger,
} from '@/src/components/common/Popover/index';

interface IProps {
  Heading: string;
  Description: string;
  children: React.ReactNode;
  onClickConfirm: () => void;
}

const ConfirmPopover = ({ Heading, Description, children, onClickConfirm }: IProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        onClick={() => setOpen((v) => !v)}
        className='px-4 py-2 w-fit flex gap-2 items-center border-[#195091] border-solid border-2 rounded-xl cursor-pointer'
      >
        {children}
      </PopoverTrigger>
      <PopoverContent className='bg-white p-8 justify-center items-center rounded-2xl shadow-lg'>
        <div className='text-2xl mb-4'>{Heading}</div>
        <div className='mb-8'>{Description}</div>
        <div className='flex gap-x-16'>
          <PopoverClose onClick={onClickConfirm} className='cursor-pointer'>
            Confirm
          </PopoverClose>
          <PopoverClose>Close</PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ConfirmPopover;
