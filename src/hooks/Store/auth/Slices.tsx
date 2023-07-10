import { StateCreator } from 'zustand';
import { v1 } from 'uuid';

import { UserState } from '@/src/hooks/Store/auth/state/UserState';

export const useUserSlice: StateCreator<
  UserState,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  UserState
> = (set, get) => ({
  id: '',
  accessToken: '',
  UserAction: {
    setId: () =>
      set((state) => {
        state.id = v1().toString();
        return state;
      }),
    setAccessToken: (token: string) =>
      set((state) => {
        state.accessToken = token;
        return state;
      }),
  },
});
