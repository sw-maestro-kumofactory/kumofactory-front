export interface Deploy {
  targetInstanceId: string | null;
  repo: Repository;
  EnvironmentVariables: EnvironmentVariables[];
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
