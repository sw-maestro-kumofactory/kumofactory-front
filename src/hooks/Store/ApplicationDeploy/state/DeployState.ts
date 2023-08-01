import { Deploy, EnvironmentVariables, Repository } from '@/src/types/Deploy';
export interface DeployState {
  targetInstanceId: string | null;
  repo: Repository;
  environmentVariables: EnvironmentVariables[];
  DeployAction: {
    setTargetInstanceId: (targetInstanceId: string) => void;
    setEnvironmentVariables: (environmentVariables: EnvironmentVariables) => void;
    updateEnvironmentVariables: (environmentVariables: EnvironmentVariables, index: number) => void;
    removeEnvironmentVariables: (key: string) => void;
  };
}
