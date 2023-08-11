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
  targetInstanceName: null,
  targetInstanceType: null,
  repositoryList: {},
  repo: {
    name: '',
    user: '',
    branch: '',
  },
  environmentVariables: [],
  DeployAction: {
    setTargetInstanceId: (targetInstanceId: string) => {
      set((state) => ({ ...state, targetInstanceId }));
    },
    setRepositoryList: (repositoryList: Record<string, any>) => {
      set((state) => ({ ...state, repositoryList }));
    },
    setTargetInstanceName: (targetInstanceName: string) => {
      set((state) => ({ ...state, targetInstanceName }));
    },
    setTargetInstanceType: (targetInstanceType: string) => {
      set((state) => ({ ...state, targetInstanceType }));
    },
    setEnvironmentVariables: (environmentVariables: EnvironmentVariables) => {
      set((state) => {
        return {
          ...state,
          environmentVariables: [...state.environmentVariables, environmentVariables],
        };
      });
    },
    updateEnvironmentVariables: (environmentVariables: EnvironmentVariables, index: number) => {
      set((state) => {
        return {
          ...state,
          environmentVariables: state.environmentVariables.map((item, i) => {
            if (i === index) {
              return environmentVariables;
            }
            return item;
          }),
        };
      });
    },
    removeEnvironmentVariables: (key: string) => {
      set((state) => {
        return {
          ...state,
          environmentVariables: state.environmentVariables.filter((item) => item.key !== key),
        };
      });
    },
  },
});
