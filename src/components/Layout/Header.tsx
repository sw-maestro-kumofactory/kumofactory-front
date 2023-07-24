'use client';
import Link from 'next/link';
import { useEffect } from 'react';

import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';
import DropDown from '@/src/components/Blueprint/downshiftTest/DropDown';
import useStore from '@/src/hooks/useStore';
import { useLogin } from '@/src/hooks/Auth/useLogin';

export const Header = () => {
  const isLogin = useStore(useLoginStore, (state) => state.isLogin);
  const { setInterceptor, Logout } = useLogin();

  useEffect(() => {
    setInterceptor();
  }, []);

  return (
    <div className='fixed flex justify-between w-full text-lg text-white bg-[#195091] h-16 p-4 select-none items-center'>
      <Link className='px-4 py-2 rounded-2xl' href='/'>
        Kumo Factory
      </Link>
      {isLogin ? (
        <>
          {/* 이런 컨셉 */}
          {/*<DropDown title={'username'} absolute={true}>*/}
          {/*  <div className={'bg-white text-black w-80'}>123</div>*/}
          {/*</DropDown>*/}
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
      )}
    </div>
  );
};
