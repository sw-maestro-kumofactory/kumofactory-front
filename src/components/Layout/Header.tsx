'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';
import useStore from '@/src/hooks/useStore';
import { useLogin } from '@/src/hooks/Auth/useLogin';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { DeployState } from '@/src/types/Deploy';
import Status from '@/src/components/Layout/Status';

const stateList = ['SUCCESS', 'FAIL', 'PENDING', 'PROVISIONING'];

export const Header = () => {
  const isLogin = useStore(useLoginStore, (state) => state.isLogin);
  const currentBlueprintId = useStore(useBlueprintStore, (state) => state.currentBlueprintId);
  const setBlueprintId = useBlueprintStore((state) => state.CommonAction.setBlueprintId);
  const [currentDeployState, setCurrentDeployState] = useState<DeployState>('SUCCESS');
  const pathname = usePathname();
  const router = useRouter();
  const { setInterceptor, Logout } = useLogin();
  const [isBlueprint, setIsBlueprint] = useState(true);

  const onClickRefresh = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    setCurrentDeployState(stateList[randomNumber] as DeployState);
  };

  useEffect(() => {
    const d = pathname.split('/');
    if (d.length >= 3 && d[1] === 'blueprint') {
      setBlueprintId(d[2]);
      if (d[3] === 'deploy') setIsBlueprint(false);
    } else setBlueprintId(null);
  }, [pathname]);

  useEffect(() => {
    setInterceptor();
  }, []);

  return (
    <div className='fixed flex justify-between w-full text-lg text-white bg-[#195091] h-16 p-4 select-none items-center'>
      <Link className='px-4 py-2 rounded-2xl' href='/'>
        Kumo Factory
      </Link>
      {currentBlueprintId && (
        <>
          <div className='flex'>
            <div
              className={`flex items-center rounded-l-md h-10 ${
                isBlueprint ? 'bg-[#799ACF] text-white' : 'bg-white text-[#799ACF]'
              } px-4 cursor-pointer`}
              onClick={() => {
                setIsBlueprint(true);
                router.push(`/blueprint/${currentBlueprintId}`);
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
                router.push(`/blueprint/${currentBlueprintId}/deploy`);
              }}
            >
              Deploy
            </div>
          </div>
          <Status onClick={onClickRefresh} currentState={currentDeployState} />
        </>
      )}

      {!currentBlueprintId &&
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
