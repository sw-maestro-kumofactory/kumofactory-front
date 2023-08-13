'use client';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';

import ModalContainer from '@/src/components/common/Modal/ModalContainer';
import Templates from '@/src/components/Blueprint/Templates/Templates';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import Card from '@/src/components/common/Card';
import AuthRequired from '@/src/components/Auth/AuthRequired';

import { getBlueprintList } from '../../api/blueprint';

const BluePrint = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userBlueprints = useAuthStore((state) => state.userBlueprints);
  const setUserBlueprints = useAuthStore((state) => state.UserBlueprintAction.setUserBlueprints);

  const getTemplate = async () => {
    try {
      const res = await getBlueprintList();
      setUserBlueprints(res, true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTemplate();
  }, []);

  return (
    <AuthRequired>
      <div className=' h-full overflow-y-scroll'>
        <div className='mx-20 my-8 text-3xl font-extrabold'>My Blueprints</div>
        <div
          className='w-full h-full px-16 flex flex-wrap content-start'
          onClick={() => {
            // 바깥쪽 누르면 모달창 닫힘
            setIsOpen(false);
          }}
        >
          <div className='w-1/3 h-2/5 p-4'>
            <div
              className='flex flex-col items-center justify-center w-full h-full text-sky-700 bg-gray-200 border-4 hover:border-sky-700 rounded-2xl cursor-pointer'
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faSquarePlus} className='text-4xl mb-4' />
              New BluePrint
            </div>
          </div>
          {Object.keys(userBlueprints).map((key) => {
            return <Card key={key} data={userBlueprints[key]} isTemplate={false} />;
          })}
          <ModalContainer isShow={isOpen}>
            <Templates />
          </ModalContainer>
        </div>
      </div>
    </AuthRequired>
  );
};

export default BluePrint;
