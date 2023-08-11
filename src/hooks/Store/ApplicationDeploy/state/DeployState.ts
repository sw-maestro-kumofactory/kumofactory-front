import { Deploy, EnvironmentVariables, PersonalRepo, Repository } from '@/src/types/Deploy';
export interface DeployState {
  targetInstanceId: string | null;
  targetInstanceName: string | null;
  targetInstanceType: string | null;
  repositoryList: Record<string, PersonalRepo[]>;
  repo: Repository;
  environmentVariables: EnvironmentVariables[];
  DeployAction: {
    setTargetInstanceId: (targetInstanceId: string) => void;
    setTargetInstanceName: (targetInstanceName: string) => void;
    setTargetInstanceType: (targetInstanceType: string) => void;
    setRepositoryList: (repositoryList: Record<string, PersonalRepo[]>) => void;
    setEnvironmentVariables: (environmentVariables: EnvironmentVariables) => void;
    updateEnvironmentVariables: (environmentVariables: EnvironmentVariables, index: number) => void;
    removeEnvironmentVariables: (key: string) => void;
  };
}
