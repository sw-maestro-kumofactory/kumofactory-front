import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { useUserBlueprintSlice } from '@/src/hooks/Store/auth/Slices';
import { UserBlueprintState } from '@/src/hooks/Store/auth/state/UserBlueprintState';

const useAuthStore = create<UserBlueprintState>()(
  immer((...a) => ({
    ...useUserBlueprintSlice(...a),
  })),
);

export default useAuthStore;
