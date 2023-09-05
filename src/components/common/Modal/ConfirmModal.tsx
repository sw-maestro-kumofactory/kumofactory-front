'use client';
import { useEffect } from 'react';

import ModalContainer from '@/src/components/common/Modal/ModalContainer';

interface IProps {
  onClick: () => void;
  setShow: (value: ((prevState: boolean) => boolean) | boolean) => void;
  show: boolean;
}
const ConfirmModal = ({ onClick, show, setShow }: IProps) => {
  const closeModal = () => {
    setShow(false);
  };

  const onKeyDownESC = (e: KeyboardEvent) => {
    e.stopPropagation();
    if (e.key === 'Escape') {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDownESC);
    return () => {
      window.removeEventListener('keydown', onKeyDownESC);
    };
  }, []);

  return (
    <ModalContainer isShow={show} setShow={setShow}>
      <div className='w-1/3 h-1/3 bg-white p-8 flex flex-col justify-center items-center rounded-xl'>
        <div className='text-2xl mb-4'>Confirm Deploy?</div>
        <div className='mb-8'>Your architecture will Deployed in AWS.</div>
        <div className='flex justify-center gap-x-16'>
          <div className='cursor-pointer' onClick={onClick}>
            Confirm
          </div>
          <div className='cursor-pointer' onClick={closeModal}>
            Cancel
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ConfirmModal;
