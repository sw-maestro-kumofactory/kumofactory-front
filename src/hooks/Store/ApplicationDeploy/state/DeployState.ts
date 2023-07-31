import { Deploy, EnvironmentVariables, Repository } from '@/src/types/Deploy';
export interface DeployState {
  targetInstanceId: string | null;
  repo: Repository;
  EnvironmentVariables: EnvironmentVariables[];
  DeployAction: {
    setTargetInstanceId: (targetInstanceId: string) => void;
    setEnvironmentVariables: (environmentVariables: EnvironmentVariables) => void;
    removeEnvironmentVariables: (key: string) => void;
  };
}
