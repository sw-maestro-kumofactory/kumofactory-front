import axios from 'axios';
import { useEffect } from 'react';

import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';
import { authAxiosInstance } from '@/src/api';
import { getRefreshToken } from '@/src/api/auth';

export const useLogin = () => {
  const { accessToken, isLogin, setAccessToken } = useLoginStore();

  const setInterceptor = () => {
    authAxiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const {
          config,
          response: { status },
        } = error;
        if (status === 401) {
          const originRequest = config;
          try {
            const res = await getRefreshToken();
            const newAccessToken = res;
            Login(newAccessToken);
            originRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return await axios(originRequest);
          } catch (err) {
            Logout();
            alert('로그인이 필요합니다.');
            window.location.href = '/';
          }
        }
        return Promise.reject(error);
      },
    );
  };

  const Login = (token: string | null) => {
    setAccessToken(token);
    authAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const Logout = () => {
    setAccessToken(null);
    delete authAxiosInstance.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    if (accessToken) {
      Login(accessToken);
    }
    setInterceptor();
  }, []);

  return {
    isLogin,
    Login,
    Logout,
    setInterceptor,
  };
};
