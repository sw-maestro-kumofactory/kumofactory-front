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
const CheckListModal = ({ onClick, show, setShow }: IProps) => {
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
      <div
        className='relative w-[745px] h-[673px] bg-white flex flex-col justify-center items-center rounded-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='absolute right-6 top-4 cursor-pointer' onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className='h-[613px] pt-16 flex flex-col items-center'>
          <div className='font-extrabold text-[21px]'>Checklist</div>
          <div>
            <div>
              <Question title='1. 일일 활성 유저(DAU)는 어느정도 인가요?' />
              <div className='flex gap-x-5'>
                <input className='accent-blue-800' type='radio' name='dau' value='100' />
                100
                <input type='radio' name='dau' value='1000' />
                1000
                <input type='radio' name='dau' value='10000' />
                10000
              </div>
            </div>
            <div>
              <Question title='2. 매달, 어느 정도의 예산을 생각하시나요??' />
              <div className='flex gap-x-5'>
                <input type='radio' name='budget' value='10만원' /> 10만원
                <input type='radio' name='budget' value='30만원' /> 30만원
                <input type='radio' name='budget' value='50만원' /> 50만원
              </div>
            </div>
          </div>
        </div>

        <div className='w-full h-[70px] flex justify-center items-center gap-x-4 bg-[#F9FBFC] border-t border-[#DAE2EC] rounded-b-xl text-xs'>
          <div className='text-white bg-[#00CBBF] rounded-md py-2 px-4 cursor-pointer'>
            <FontAwesomeIcon className='mr-1' icon={faCheck} />
            Confirm
          </div>
          <div className='bg-white border border-[#E2E9F0] py-2 px-4 cursor-pointer' onClick={closeModal}>
            <FontAwesomeIcon className='mr-1' icon={faXmark} />
            Cancel
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default CheckListModal;

const Question = ({ title }: { title: string }) => {
  return <div className='text-[15px] mt-12 mb-5'>{title}</div>;
};
