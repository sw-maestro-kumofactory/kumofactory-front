import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';

import { UserState } from '@/src/hooks/Store/auth/state/UserState';
import { useUserBlueprintSlice, useUserSlice } from '@/src/hooks/Store/auth/Slices';
import { UserBlueprintState } from '@/src/hooks/Store/auth/state/UserBlueprintState';

const useAuthStore = create<UserState & UserBlueprintState>()(
  persist(
    (...a) => ({
      ...useUserSlice(...a),
      ...useUserBlueprintSlice(...a),
    }),
    {
      name: 'accessToken',
      partialize: (state) => state.accessToken,
    },
  ),
);

export default useAuthStore;
