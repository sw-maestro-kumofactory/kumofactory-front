import axios from 'axios';
import { useEffect } from 'react';

import { authAxiosInstance } from '@/src/api';
import { getRefreshToken, logout } from '@/src/api/auth';
import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';

export const useLogin = () => {
  const { accessToken, isLogin, setAccessToken, username } = useLoginStore();

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
            Login(newAccessToken, username);
            originRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return await axios(originRequest);
          } catch (err) {
            await Logout();
            alert('로그인이 필요합니다.');
            window.location.href = '/';
          }
        }
        return Promise.reject(error);
      },
    );
  };

  const Login = (token: string | null, username: string) => {
    setAccessToken(token, username);
    authAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const Logout = async () => {
    console.log('logout');
    try {
      setAccessToken(null, '');
      await logout();
      delete authAxiosInstance.defaults.headers.common['Authorization'];
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      Login(accessToken, username);
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
