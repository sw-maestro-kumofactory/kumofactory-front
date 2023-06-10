'use client';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState } from '@/src/atoms/auth';

export const useLogin = () => {
  const setAccessToken = useSetRecoilState(accessTokenState);
  const [isLogin, setIsLogin] = useState<string | null>(useRecoilValue(accessTokenState));

  const login = (token: string) => {
    return 0;
  };

  const logout = () => {
    setAccessToken(null);
    setIsLogin(null);
  };

  return { isLogin, login, logout };
};
