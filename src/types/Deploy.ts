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
  repoInfo: PersonalRepoResponse[];
  orgCount: number;
  orgList: string[];
}

export interface PersonalRepoResponse {
  name: string;
  fullName: string;
  private: boolean;
  fork: boolean;
  forksCount: number;
  description: string;
  language: string;
  languageColor: string;
  starCount: number;
  stargazersUrl: string;
  openIssuesCount: number;
  visibility: string;
  updatedAt: string;
  createdAt: string;
}

export interface PersonalRepo extends PersonalRepoResponse {
  environmentVariables: EnvironmentVariables[];
}

export interface DeployRequest {
  targetInstance: string;
  user: string;
  repo: string;
  branch: string;
  language: string;
  env: EnvironmentVariables[];
}

export interface RecourseResponse {
  id: string;
  key: string;
  result: Record<string, Resource>;
}

export interface Resource {
  instanceId: string;
  instanceName: string;
  privateIp: string;
  uuid: string;
  publicIp?: string;
  deployStatus: string;
  deployedBranch: string;
  deployedRepository: string;
}

export type DeployState = 'PROVISIONING' | 'PENDING' | 'SUCCESS' | 'FAIL';
