import { useState } from 'react';

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeading,
  PopoverTrigger,
} from '@/src/components/common/Popover/index';
import useInput from '@/src/hooks/useInput';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

interface IProps {
  Heading?: string;
  Description?: string;
  children: React.ReactNode;
  onClickConfirm?: () => void;
}

const BlueprintNamePopover = ({ children }: IProps) => {
  const [open, setOpen] = useState(false);

  const name = useBlueprintStore((state) => state.currentBlueprintInfo.name);
  const setName = useBlueprintStore((state) => state.CommonAction.setName);
  const setIsEdit = useBlueprintStore((state) => state.CommonAction.setIsEdit);

  const { value: nameValue, onHandleChange: onHandleNameChange } = useInput(name);
  const { value: description, onHandleChange: onHandleDescriptionChange } = useInput('');

  const onClickConfirm = () => {
    setOpen(false);
    setName(nameValue);
    setIsEdit(false);
  };

  const onClickCancel = () => {
    setOpen(false);
    setIsEdit(false);
  };

  return (
    <Popover placement='bottom-start' open={open} onOpenChange={setOpen}>
      <PopoverTrigger onClick={() => setOpen((v) => !v)}>{children}</PopoverTrigger>
      <PopoverContent className='bg-white w-80 p-4 justify-center items-center rounded-md shadow-lg'>
        <form>
          <label className='mb-4'>Blueprint Name</label>
          <input className='w-full p-2 bg-gray-100 rounded-md' value={nameValue} onChange={onHandleNameChange} />
          <label>Blueprint Description</label>
          <input
            className='w-full p-2 bg-gray-100 rounded-md'
            value={description}
            onChange={onHandleDescriptionChange}
          />
        </form>
        <div className='flex justify-end gap-x-2'>
          <button
            className='border-2 border-solid border-gray-400 text-white bg-gray-400 rounded-md p-1 mt-4'
            onClick={onClickConfirm}
          >
            Confirm
          </button>
          <button
            className='border-2 border-solid border-gray-400 text-black rounded-md p-1 mt-4'
            onClick={onClickConfirm}
          >
            Cancel
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BlueprintNamePopover;
