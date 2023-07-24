import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { LoginState } from '@/src/hooks/Store/auth/state/LoginState';

export const useLoginStore = create(
  persist<LoginState>(
    (set) => ({
      accessToken: '',
      isLogin: false,
      setAccessToken: (token: string | null) =>
        set({
          accessToken: token,
          isLogin: !!token,
        }),
    }),
    {
      name: 'loginState',
    },
  ),
);
