'use client';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';

import ModalContainer from '@/src/components/common/Modal/ModalContainer';
import Templates from '@/src/components/Blueprint/Templates/Templates';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import Card from '@/src/components/common/Card';
import AuthRequired from '@/src/components/Auth/AuthRequired';
import { deleteBlueprint, getBlueprintList } from '@/src/api/blueprint';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import CheckListModal from '@/src/components/common/Modal/ChecklistModal';

const BluePrint = () => {
  const router = useRouter();
  const isTemplateOpen = useBlueprintStore((state) => state.isTemplateOpen);
  const setIsTemplateOpen = useBlueprintStore((state) => state.CommonAction.setIsTemplateOpen);
  const userBlueprints = useAuthStore((state) => state.userBlueprints);
  const { setUserBlueprints, deleteUserBlueprint } = useAuthStore((state) => state.UserBlueprintAction);
  const [isCheckListOpen, setCheckListOpen] = useState(false);

  const getTemplate = async () => {
    try {
      const res = await getBlueprintList();
      setUserBlueprints(res, true);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickTrashCan = async (id: string) => {
    try {
      await deleteBlueprint(id);
      deleteUserBlueprint(id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTemplate();
  }, []);

  return (
    <AuthRequired>
      <div className='h-full flex flex-col items-center overflow-y-scroll px-[207px] py-[50px] bg-[#F9FBFC]'>
        <div className='flex flex-col justify-center  text-[26px] font-extrabold mb-10'>
          <div>My Blueprints</div>
          <button className='text-gray-500 text-xs font-normal' onClick={() => setCheckListOpen(true)}>
            상황에 맞는 템플릿 생성하기
          </button>
        </div>
        <div className='w-full h-full flex justify-center'>
          <div className='w-full flex flex-wrap gap-x-[34px] gap-y-[45px]'>
            <div className='w-[290px] h-[232px] text-[#96ABBB] hover:text-[#7A91A1]'>
              <div
                className='flex flex-col items-center justify-center w-full h-full text-sm rounded-md bg-white border-2  hover:bg-[#F9FBFC] cursor-pointer border-[#DAE2EC] hover:border-[#CCD6E2] hover:drop-shadow-md'
                onClick={(e) => {
                  e.stopPropagation();
                  setIsTemplateOpen(true);
                  router.push('/blueprint?template=true');
                }}
              >
                <FontAwesomeIcon icon={faSquarePlus} className='text-lg mb-4' />
                New Blueprint
              </div>
            </div>
            {Object.keys(userBlueprints).map((key) => {
              return (
                <Card
                  key={key}
                  data={userBlueprints[key]}
                  isTemplate={false}
                  onClickDelete={() => {
                    onClickTrashCan(userBlueprints[key].uuid);
                  }}
                />
              );
            })}
            <ModalContainer isShow={isTemplateOpen} setShow={setIsTemplateOpen}>
              <Templates />
            </ModalContainer>
            <CheckListModal onClick={() => {}} setShow={setCheckListOpen} show={isCheckListOpen} />
          </div>
        </div>
      </div>
    </AuthRequired>
  );
};

export default BluePrint;
