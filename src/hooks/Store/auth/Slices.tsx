import { StateCreator } from 'zustand';

import { UserBlueprintState } from '@/src/hooks/Store/auth/state/UserBlueprintState';

export const useUserBlueprintSlice: StateCreator<
  UserBlueprintState,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  UserBlueprintState
> = (set, get) => ({
  userBlueprints: [],
  UserBlueprintAction: {
    setUserBlueprints: (userBlueprints) => set({ userBlueprints: userBlueprints }),
  },
});
