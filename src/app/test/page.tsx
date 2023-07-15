'use client';
import { useState } from 'react';

import ModalContainer from '@/src/components/common/Modal/ModalContainer';

const TestPage = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <ModalContainer isShow={true}>
        <div className='w-[80%] h-[80%] rounded-2xl bg-white'>test</div>
      </ModalContainer>
    </>
  );
};

export default TestPage;
