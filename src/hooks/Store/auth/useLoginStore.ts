import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LoginState } from '@/src/hooks/Store/auth/state/LoginState';

export const useLoginStore = create(
  persist<LoginState>(
    (set) => ({
      username: '',
      accessToken: '',
      isLogin: false,
      setAccessToken: (token: string | null, username: string) =>
        set({
          accessToken: token,
          isLogin: !!token,
          username: username,
        }),
    }),
    {
      name: 'loginState',
    },
  ),
);
