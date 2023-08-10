export interface Deploy {
  targetInstanceId: string | null;
  repo: Repository;
  environmentVariables: EnvironmentVariables[];
}

export interface Repository {
  name: string;
  user: string;
  branch: string;
}

export interface EnvironmentVariables {
  key: string;
  value: string;
}

export interface DeployResponse {
  repoCount: number;
  repoInfo: PersonalRepo[];
  orgCount: number;
  orgList: string[];
}

export interface PersonalRepo {
  name: string;
  fullName: string;
  private: boolean;
  fork: boolean;
}

export interface DeployRequest {
  targetInstance: string;
  user: string;
  repo: string;
  branch: string;
  language: string;
  env: EnvironmentVariables[];
}

export type DeployState = 'PROVISIONING' | 'PENDING' | 'SUCCESS' | 'FAIL';
