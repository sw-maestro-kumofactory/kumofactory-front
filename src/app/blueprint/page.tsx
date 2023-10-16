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

const BluePrint = () => {
  const router = useRouter();
  const isTemplateOpen = useBlueprintStore((state) => state.isTemplateOpen);
  const setIsTemplateOpen = useBlueprintStore((state) => state.CommonAction.setIsTemplateOpen);
  const userBlueprints = useAuthStore((state) => state.userBlueprints);
  const { setUserBlueprints, deleteUserBlueprint } = useAuthStore((state) => state.UserBlueprintAction);

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
      <div className='h-full overflow-y-scroll px-[207px] py-[50px] bg-[#F9FBFC]'>
        <div className=' text-[26px] font-extrabold mb-10'>My Blueprints</div>
        <div className='w-full h-full flex flex-wrap content-start gap-x-[34px] gap-y-[45px]'>
          <div className='w-[290px] h-[232px] text-[#96ABBB]'>
            <div
              className='flex flex-col items-center justify-center w-full h-full text-sm rounded-md cursor-pointer border-[#DAE2EC] border-2'
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
        </div>
      </div>
    </AuthRequired>
  );
};

export default BluePrint;
