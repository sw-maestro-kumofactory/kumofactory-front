import { StateCreator } from 'zustand';

import { DeployState } from '@/src/hooks/Store/ApplicationDeploy/state/DeployState';
import { EnvironmentVariables } from '@/src/types/Deploy';

export const useOptionSlice: StateCreator<
  DeployState,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  DeployState
> = (set, get) => ({
  targetInstanceId: null,
  repo: {
    name: '',
    user: '',
    branch: '',
  },
  EnvironmentVariables: [],
  DeployAction: {
    setTargetInstanceId: (targetInstanceId: string) => {
      set((state) => ({ ...state, targetInstanceId }));
    },
    setEnvironmentVariables: (environmentVariables: EnvironmentVariables) => {
      set((state) => {
        return {
          ...state,
          EnvironmentVariables: [...state.EnvironmentVariables, environmentVariables],
        };
      });
    },
    removeEnvironmentVariables: (key: string) => {
      set((state) => {
        return {
          ...state,
          EnvironmentVariables: state.EnvironmentVariables.filter((item) => item.key !== key),
        };
      });
    },
  },
});
