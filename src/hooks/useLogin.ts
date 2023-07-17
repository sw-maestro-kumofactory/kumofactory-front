'use client';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.UserAction.setAccessToken);

  const login = (token: string) => {
    setAccessToken(token);
  };

  const logout = () => {
    setAccessToken(null);
  };

  return { login, logout };
};
