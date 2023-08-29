'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';
import useStore from '@/src/hooks/useStore';
import { useLogin } from '@/src/hooks/Auth/useLogin';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { DeployState } from '@/src/types/Deploy';
import Status from '@/src/components/Layout/Status';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import BlueprintNamePopover from '@/src/components/common/Popover/BlueprintNamePopover';

export const Header = () => {
  const isLogin = useStore(useLoginStore, (state) => state.isLogin);
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const userBlueprints = useAuthStore((state) => state.userBlueprints);
  const setBlueprintId = useBlueprintStore((state) => state.CommonAction.setBlueprintId);
  const setCurrentBlueprintInfo = useBlueprintStore((state) => state.CommonAction.setCurrentBlueprintInfo);
  const [currentDeployState, setCurrentDeployState] = useState<DeployState>(currentBlueprintInfo.status);
  const editUserBlueprints = useAuthStore((state) => state.UserBlueprintAction.editUserBlueprints);

  const pathname = usePathname();
  const router = useRouter();
  const { setInterceptor, Logout } = useLogin();
  const [isBlueprint, setIsBlueprint] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const onClickRefresh = () => {
    // setCurrentDeployState(stateList[randomNumber] as DeployState);
    editUserBlueprints({ ...currentBlueprintInfo, status: 'SUCCESS' }, true);
    setCurrentBlueprintInfo({ ...currentBlueprintInfo, status: 'SUCCESS' as DeployState });
    setCurrentDeployState('SUCCESS' as DeployState);
  };

  const onClickEdit = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    const d = pathname.split('/');
    if (d.length >= 3 && d[1] === 'blueprint') {
      setBlueprintId(d[2]);
      if (Object.keys(userBlueprints).includes(d[2])) setCurrentDeployState(userBlueprints[d[2]].status);
      if (d[3] === 'deploy') setIsBlueprint(false);
    } else {
      setIsBlueprint(true);
      setBlueprintId('');
    }
  }, [pathname]);

  useEffect(() => {
    setCurrentDeployState(currentBlueprintInfo.status);
  }, [userBlueprints]);

  useEffect(() => {
    setInterceptor();
  }, []);

  return (
    <div className='fixed flex justify-between w-full text-lg text-white bg-[#195091] h-16 p-4 select-none items-center'>
      <div className='flex gap-x-4 content-center py-2'>
        <Link className='px-4 rounded-2xl' href='/'>
          Kumo Factory
        </Link>
        {currentBlueprintInfo.uuid && (
          <BlueprintNamePopover>
            <div className='flex gap-x-4 items-center'>
              <div className='max-w-xs overflow-x-hidden '>{currentBlueprintInfo.name}</div>
              <FontAwesomeIcon onClick={onClickEdit} className='h-full cursor-pointer' icon={faPenToSquare} />
            </div>
          </BlueprintNamePopover>
        )}
      </div>

      {currentBlueprintInfo.uuid && (
        <>
          <div className='absolute top-4 left-1/2 -translate-x-1/2 flex'>
            <div
              className={`flex items-center rounded-l-md h-10 ${
                isBlueprint ? 'bg-[#799ACF] text-white' : 'bg-white text-[#799ACF]'
              } px-4 cursor-pointer`}
              onClick={() => {
                setIsBlueprint(true);
                router.push(`/blueprint/${currentBlueprintInfo.uuid}`);
              }}
            >
              Blueprint
            </div>
            <div
              className={`flex items-center rounded-r-md h-10 ${
                isBlueprint ? 'bg-white text-[#799ACF]' : 'bg-[#799ACF] text-white'
              } px-4 cursor-pointer`}
              onClick={() => {
                setIsBlueprint(false);
                router.push(`/blueprint/${currentBlueprintInfo.uuid}/deploy`);
              }}
            >
              Deploy
            </div>
          </div>
          <Status onClick={onClickRefresh} currentState={currentDeployState} />
        </>
      )}

      {!currentBlueprintInfo.uuid &&
        (isLogin ? (
          <>
            <div
              className={'cursor-pointer'}
              onClick={() => {
                Logout();
              }}
            >
              로그아웃
            </div>
          </>
        ) : (
          <>
            <Link className='bg-[#799ACF] px-4 py-2 rounded-2xl' href='/auth/login'>
              SignIn
            </Link>
          </>
        ))}
    </div>
  );
};
