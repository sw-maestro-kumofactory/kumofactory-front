'use client';
import { useState } from 'react';

import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.UserAction.setAccessToken);

  const login = (token: string) => {
    setAccessToken(token);
    return 0;
  };

  const logout = () => {
    setAccessToken(null);
  };

  return { login, logout };
};
