import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useState } from 'react';

import useInput from '@/src/hooks/useInput';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';

interface IProps {
  Heading?: string;
  Description?: string;
  children: React.ReactNode;
  onClickConfirm?: () => void;
  isShow: boolean;
  setShow: (isShow: boolean) => void;
}

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const BlueprintNameModal = ({ children, setShow }: IProps) => {
  const name = useBlueprintStore((state) => state.currentBlueprintInfo.name);
  const description = useBlueprintStore((state) => state.currentBlueprintInfo.description);
  const setInfo = useBlueprintStore((state) => state.CommonAction.setInfo);
  const setIsEdit = useBlueprintStore((state) => state.CommonAction.setIsEdit);
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const setCurrentBlueprintInfo = useBlueprintStore((state) => state.CommonAction.setCurrentBlueprintInfo);
  const editUserBlueprints = useAuthStore((state) => state.UserBlueprintAction.editUserBlueprints);

  const { value: nameValue, onHandleChange: onHandleNameChange } = useInput(name);
  const [descriptionValue, setDescriptionValue] = useState<string | undefined>(description);

  const onClickConfirm = () => {
    setShow(false);
    if (descriptionValue) {
      setInfo(nameValue, descriptionValue);
      editUserBlueprints({ ...currentBlueprintInfo, name: nameValue, description: descriptionValue }, true);
      setCurrentBlueprintInfo({ ...currentBlueprintInfo, name: nameValue, description: descriptionValue });
    }
    setIsEdit(false);
  };

  const onClickCancel = () => {
    setShow(false);
    setIsEdit(false);
  };
  // Popover version
  // return (
  //   <Popover placement='bottom-start' open={open} onOpenChange={setOpen}>
  //     <PopoverTrigger onClick={() => setOpen((v) => !v)}>{children}</PopoverTrigger>
  //     <PopoverContent className='bg-white w-[285px] h-[237px] py-[22px] px-[17px] text-[11px] justify-center items-center rounded-md shadow-lg'>

  //     </PopoverContent>
  //   </Popover>
  // );
  // modal version
  return (
    <div className='w-[1365px] h-[685px] bg-white rounded-2xl' onClick={(e) => e.stopPropagation()}>
      <div className='flex py-[17px] pl-[27px]'>
        <Image width={18} height={18} alt={'catalog'} src='/icons/Design/catalog.svg' />
        <div className='ml-3 font-bold'>Blueprint Description</div>
      </div>
      <hr />
      <div className='px-7 py-5 h-full'>
        <label className='text-[#A5B0B9] font-bold mb-1'>Name</label>
        <input
          className='w-full text-[14px] font-bold p-2 rounded-md border-solid border-2 border-[#DAE2EC] mb-[12px]'
          value={nameValue}
          onChange={onHandleNameChange}
        />
        <div>
          <MDEditor height={450} value={descriptionValue} onChange={(val) => setDescriptionValue(val)} />
        </div>
        <div className='flex justify-end gap-x-2 mt-4'>
          <button className='text-white bg-[#00CBBF] rounded-md p-1 ' onClick={onClickConfirm}>
            Confirm
          </button>
          <button className='border-2 border-solid border-[#DAE2EC] text-black rounded-md p-1 ' onClick={onClickCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlueprintNameModal;
