'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import axios from 'axios';

import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import DropDown from '@/src/components/Blueprint/downshiftTest/DropDown';
import { authAxiosInstance } from '@/src/api';
export const Header = () => {
  const isLogin = useStore(useAuthStore, (state) => state.isLogin);
  const setAccessToken = useStore(useAuthStore, (state) => state.UserAction.setAccessToken);

  // const isLogin = true;
  useEffect(() => {
    if (window !== null) {
      const token = localStorage.getItem('accessToken');
      if (token) setAccessToken(token);
    }
    authAxiosInstance
      .get('/apiTest/auth')
      .then((res) => {
        console.log('Res', res);
      })
      .catch((error) => console.log('error: ', error));
  }, []);

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
        <>
          <div
            className='cursor-pointer'
            onClick={() => {
              const data = axios.get('/apiTest/auth/login').then((res) => {
                setAccessToken(res.data.accessToken);
              });
            }}
          >
            Login test
          </div>
          <Link className='bg-[#799ACF] px-4 py-2 rounded-2xl' href='/auth/login'>
            SignIn
          </Link>
        </>
      )}
    </div>
  );
};
