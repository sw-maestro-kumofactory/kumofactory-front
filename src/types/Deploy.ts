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
  repoCount: string;
  repoInfo: PersonalRepo[];
  orgCount: string;
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
