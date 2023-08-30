import { useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/common/Popover/index';
import useInput from '@/src/hooks/useInput';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';

interface IProps {
  Heading?: string;
  Description?: string;
  children: React.ReactNode;
  onClickConfirm?: () => void;
}

const BlueprintNamePopover = ({ children }: IProps) => {
  const [open, setOpen] = useState(false);

  const name = useBlueprintStore((state) => state.currentBlueprintInfo.name);
  const description = useBlueprintStore((state) => state.currentBlueprintInfo.description);
  const setInfo = useBlueprintStore((state) => state.CommonAction.setInfo);
  const setIsEdit = useBlueprintStore((state) => state.CommonAction.setIsEdit);
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const setCurrentBlueprintInfo = useBlueprintStore((state) => state.CommonAction.setCurrentBlueprintInfo);
  const editUserBlueprints = useAuthStore((state) => state.UserBlueprintAction.editUserBlueprints);

  const { value: nameValue, onHandleChange: onHandleNameChange } = useInput(name);
  const { value: descriptionValue, onHandleChange: onHandleDescriptionChange } = useInput(description);

  const onClickConfirm = () => {
    setOpen(false);
    setInfo(nameValue, descriptionValue);
    editUserBlueprints({ ...currentBlueprintInfo, name: nameValue, description: descriptionValue }, true);
    setCurrentBlueprintInfo({ ...currentBlueprintInfo, name: nameValue, description: descriptionValue });
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
            value={descriptionValue}
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
