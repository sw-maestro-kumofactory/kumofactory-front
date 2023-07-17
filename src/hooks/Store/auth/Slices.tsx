import { StateCreator } from 'zustand';
import { v1 } from 'uuid';

import { UserState } from '@/src/hooks/Store/auth/state/UserState';
import { authAxiosInstance } from '@/src/api';
import { UserBlueprintState } from '@/src/hooks/Store/auth/state/UserBlueprintState';

export const useUserSlice: StateCreator<
  UserState,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  UserState
> = (set, get) => ({
  id: '',
  accessToken: '',
  isLogin: false,
  UserAction: {
    setId: () =>
      set((state) => {
        state.id = v1().toString();
        return state;
      }),
    logout: () =>
      set((state) => {
        state.accessToken = '';
        state.isLogin = false;
        delete authAxiosInstance.defaults.headers.common['Authorization'];
        return state;
      }),
    setAccessToken: (token: string | null) =>
      set((state) => {
        state.accessToken = token;
        state.isLogin = true;
        authAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return state;
      }),
  },
});

export const useUserBlueprintSlice: StateCreator<
  UserBlueprintState,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  UserBlueprintState
> = (set, get) => ({
  userBlueprints: [],
  UserBlueprintAction: {
    setUserBlueprints: (userBlueprints) =>
      set((state) => {
        state.userBlueprints = userBlueprints;
        return state;
      }),
  },
});
