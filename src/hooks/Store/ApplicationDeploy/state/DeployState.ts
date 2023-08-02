import { Deploy, EnvironmentVariables, Repository } from '@/src/types/Deploy';
export interface DeployState {
  targetInstanceId: string | null;
  targetInstanceName: string | null;
  repo: Repository;
  environmentVariables: EnvironmentVariables[];
  DeployAction: {
    setTargetInstanceId: (targetInstanceId: string) => void;
    setTargetInstanceName: (targetInstanceName: string) => void;
    setEnvironmentVariables: (environmentVariables: EnvironmentVariables) => void;
    updateEnvironmentVariables: (environmentVariables: EnvironmentVariables, index: number) => void;
    removeEnvironmentVariables: (key: string) => void;
  };
}
