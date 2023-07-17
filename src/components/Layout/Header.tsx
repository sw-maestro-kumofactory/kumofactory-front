'use client';
import Link from 'next/link';

import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import DropDown from '@/src/components/Blueprint/downshiftTest/DropDown';
export const Header = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  // const isLogin = true;
  return (
    <div className='fixed flex justify-between w-full text-2xl text-white bg-[#195091] h-20 p-4 select-none items-center'>
      <Link className='px-4 py-2 rounded-2xl' href='/'>
        Kumo Factory
      </Link>
      {isLogin ? (
        <>
          {/* 이런 컨셉 */}
          {/*<DropDown title={'username'} absolute={true}>*/}
          {/*  <div className={'bg-white text-black w-80'}>123</div>*/}
          {/*</DropDown>*/}
        </>
      ) : (
        <Link className='bg-[#799ACF] px-4 py-2 rounded-2xl' href='/auth/login'>
          SignIn
        </Link>
      )}
    </div>
  );
};
