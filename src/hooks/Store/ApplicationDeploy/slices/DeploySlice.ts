import { StateCreator } from 'zustand';
import { stat } from 'fs';

import { DeployState } from '@/src/hooks/Store/ApplicationDeploy/state/DeployState';
import { EnvironmentVariables, Resource } from '@/src/types/Deploy';

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
  environmentVariables: {},
  deployedResourceList: {},
  DeployAction: {
    addDeployedResource: (id: string, resource: Resource) => {
      set((state) => {
        state.deployedResourceList[id] = resource;
        return state;
      });
    },
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
    addEnvironmentVariables: (id: string, environmentVariables: EnvironmentVariables) => {
      set((state) => {
        return {
          ...state,
          environmentVariables: {
            ...state.environmentVariables,
            [id]: [...state.environmentVariables[id], environmentVariables],
          },
        };
      });
    },
    initEnvironmentVariables: (id: string) => {
      set((state) => {
        return {
          ...state,
          environmentVariables: {
            ...state.environmentVariables,
            [id]: [],
          },
        };
      });
    },
    updateEnvironmentVariables: (id: string, environmentVariables: EnvironmentVariables, index: number) => {
      set((state) => {
        // If there are matched environment id and key, remove it.
        return {
          ...state,
          environmentVariables: {
            ...state.environmentVariables,
            [id]: state.environmentVariables[id].map((item, i) => {
              if (i === index) {
                return environmentVariables;
              }
              return item;
            }),
          },
        };
      });
    },
    removeEnvironmentVariables: (id: string, key: string) => {
      set((state) => {
        return {
          ...state,
          environmentVariables: {
            ...state.environmentVariables,
            [id]: state.environmentVariables[id].filter((item) => item.key !== key),
          },
        };
      });
    },
  },
});
