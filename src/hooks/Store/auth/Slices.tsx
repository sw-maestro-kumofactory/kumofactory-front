import { StateCreator } from 'zustand';

import { UserBlueprintState } from '@/src/hooks/Store/auth/state/UserBlueprintState';

export const useUserBlueprintSlice: StateCreator<
  UserBlueprintState,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  UserBlueprintState
> = (set, get) => ({
  userBlueprints: {},
  userBlueprintsIds: [],
  UserBlueprintAction: {
    addUserBlueprint: (userBlueprint, saved) =>
      set((state) => {
        state.userBlueprints[userBlueprint.uuid] = { ...userBlueprint, saved: saved };
        state.userBlueprintsIds.push(userBlueprint.uuid);
        return state;
      }),
    deleteUserBlueprint: (uuid) =>
      set((state) => {
        delete state.userBlueprints[uuid];
        state.userBlueprintsIds = state.userBlueprintsIds.filter((id) => id !== uuid);
        return state;
      }),
    setUserBlueprints: (userBlueprints, saved) =>
      set((state) => {
        userBlueprints.map((userBlueprint) => {
          state.userBlueprints[userBlueprint.uuid] = { ...userBlueprint, saved: saved };
          state.userBlueprintsIds.push(userBlueprint.uuid);
        });
        return state;
      }),
  },
});
