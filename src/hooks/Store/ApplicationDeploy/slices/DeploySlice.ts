import { StateCreator } from 'zustand';

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
  isLoading: true,
  environmentVariables: {},
  deployedResourceList: {},
  DeployAction: {
    setIsLoading: (isLoading: boolean) => {
      set((state) => ({ ...state, isLoading }));
    },
    addDeployedResource: (id: string, resource: Resource) => {
      set((state) => {
        state.deployedResourceList[id] = resource;
        return state;
      });
    },
    addDeployStatusOfResource: (id: string, status: string) => {
      set((state) => {
        state.deployedResourceList[id].deployStatus = status;
        return state;
      });
    },
    addRepositoryInfoOfResource: (id: string, deployedRepository: string, deployedBranch: string) => {
      set((state) => {
        state.deployedResourceList[id].deployedRepository = deployedRepository;
        state.deployedResourceList[id].deployedBranch = deployedBranch;
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
