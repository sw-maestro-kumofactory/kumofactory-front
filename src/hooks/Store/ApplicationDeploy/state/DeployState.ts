import {
  Deploy,
  EnvironmentVariables,
  PersonalRepo,
  PersonalRepoResponse,
  Repository,
  Resource,
} from '@/src/types/Deploy';

export interface DeployState {
  targetInstanceId: string | null;
  targetInstanceName: string | null;
  targetInstanceType: string | null;
  deployedResourceList: Record<string, Resource>;
  repositoryList: Record<string, PersonalRepo[]>;
  repo: Repository;
  environmentVariables: Record<string, EnvironmentVariables[]>;
  DeployAction: {
    addDeployedResource: (id: string, resource: Resource) => void;
    setTargetInstanceId: (targetInstanceId: string) => void;
    setTargetInstanceName: (targetInstanceName: string) => void;
    setTargetInstanceType: (targetInstanceType: string) => void;
    setRepositoryList: (repositoryList: Record<string, PersonalRepoResponse[]>) => void;
    addEnvironmentVariables: (id: string, environmentVariables: EnvironmentVariables) => void;
    initEnvironmentVariables: (id: string) => void;
    updateEnvironmentVariables: (id: string, environmentVariables: EnvironmentVariables, index: number) => void;
    removeEnvironmentVariables: (id: string, key: string) => void;
  };
}
