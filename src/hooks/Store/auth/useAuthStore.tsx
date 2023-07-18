import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { UserState } from '@/src/hooks/Store/auth/state/UserState';
import { useUserBlueprintSlice, useUserSlice } from '@/src/hooks/Store/auth/Slices';
import { UserBlueprintState } from '@/src/hooks/Store/auth/state/UserBlueprintState';

const useAuthStore = create<UserState & UserBlueprintState>()(
  immer((...a) => ({
    ...useUserSlice(...a),
    ...useUserBlueprintSlice(...a),
  })),
);

export default useAuthStore;
