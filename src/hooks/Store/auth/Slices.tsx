import { UserState } from '@/src/hooks/Store/auth/state/UserState';
import { StateCreator } from 'zustand';
export const useUserSlice: StateCreator<
  UserState,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  UserState
> = (set, get) => ({
  id: '',
  accessToken: '',
  UserAction: {
    setAccessToken: (token: string) =>
      set((state) => {
        state.accessToken = token;
        return state;
      }),
  },
});
