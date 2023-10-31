'use client';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import ModalContainer from '@/src/components/common/Modal/ModalContainer';

interface IProps {
  onClick: () => void;
  setShow: (value: ((prevState: boolean) => boolean) | boolean) => void;
  show: boolean;
}
const DeployConfirmModal = ({ onClick, show, setShow }: IProps) => {
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
      <div className='relative w-[460px] h-[250px] bg-white p-8 rounded-xl'>
        <div className='absolute right-6 top-4 cursor-pointer' onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className='flex flex-col justify-center items-center pt-8'>
          <div className='text-xl font-semibold mb-4'>Confirm Deploy?</div>
          <div className='text-base mb-8'>Your Application will be Deployed in EC2.</div>
          <div className='flex justify-center gap-x-3 text-sm'>
            <div
              className='w-[107px] h-9 flex items-center justify-center gap-x-2 cursor-pointer bg-[#00CBBF] text-white rounded-md'
              onClick={onClick}
            >
              <FontAwesomeIcon icon={faCheck} />
              Confirm
            </div>
            <div
              className='w-[107px] h-9 flex items-center justify-center gap-x-2 cursor-pointer box-content border border-black rounded-md bg-white'
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faXmark} />
              Cancel
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default DeployConfirmModal;
