'use client';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { useStore } from 'zustand';

import ModalContainer from '@/src/components/common/Modal/ModalContainer';
import Templates from '@/src/components/Blueprint/Templates/Templates';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import { getTemplateList, getTemplateListById } from '@/src/api/template';

const BluePrint = () => {
  const accessToken = useStore(useAuthStore, (state) => state.accessToken);
  const [isOpen, setIsOpen] = useState(false);
  const userBlueprints = useStore(useAuthStore, (state) => state.userBlueprints);
  console.log(userBlueprints);
  useEffect(() => {
    // getTemplateList(accessToken).then((res) => {
    //   console.log(res);
    // });
  }, []);

  return (
    <div
      className='w-full h-full p-16'
      onClick={() => {
        // 바깥쪽 누르면 모달창 닫힘
        setIsOpen(false);
      }}
    >
      <div className='flex w-full h-[45%] justify-between  mb-12'>
        <Link
          className='flex flex-col items-center justify-center w-[48%] h-full text-sky-700 bg-gray-200 border-4 hover:border-sky-700 cursor-pointer'
          href='/blueprint/empty'
        >
          <FontAwesomeIcon icon={faSquarePlus} className='text-4xl mb-4' />
          New BluePrint
        </Link>
        <div
          className='flex flex-col items-center justify-center w-[48%] h-full text-sky-700 bg-gray-200 border-4 hover:border-sky-700 cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faSquarePlus} className='text-4xl mb-4' />
          Load Template
        </div>
      </div>
      <div className='h-[50%] bg-sky-700 text-white  overflow-x-hidden overflow-y-hidden'>
        <div className='flex h-1/6 w-full border-b-2 border-blue-100 px-4'>
          <div className='w-3/4 flex items-center'>name</div>
          <div className='w-1/4 flex items-center'>created</div>
        </div>
        <div className='flex h-5/6 w-full overflow-y-scroll overflow-x-hidden px-4'>
          <div className='flex items-center w-full h-16 '>
            <Link className='w-3/4 mr-4 h-full flex items-center' href={`/blueprint/testId`}>
              <div>blueprint.name</div>
            </Link>
            <div className='w-1/4 ml-4 h-full flex items-center'>blueprint.name</div>
          </div>
          {/* UI */}
          {userBlueprints.map((blueprint) => {
            return (
              <div key={blueprint.id} className='flex ml-4 items-center w-full h-16 '>
                <Link className='w-3/4' href={`/blueprint/${blueprint.id}`}>
                  <div>{blueprint.name}</div>
                </Link>
                <div className='w-1/4'>{blueprint.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <ModalContainer isShow={isOpen}>
        <Templates />
      </ModalContainer>
    </div>
  );
};

export default BluePrint;
