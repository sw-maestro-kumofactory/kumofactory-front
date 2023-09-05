import { authAxiosInstance } from '@/src/api';
import { DeployRequest, DeployResponse, PersonalRepoResponse } from '@/src/types/Deploy';

export const getUserRepositories = async () => {
  const { data } = await authAxiosInstance.get<DeployResponse>(`/api/build/list`);
  return data;
};

export const getOrgRepositories = async (org: string) => {
  const { data } = await authAxiosInstance.get<PersonalRepoResponse[]>(`/api/build/list/${org}/repo`);
  return data;
};

export const getOrgRepoBranches = async (org: string, repo: string) => {
  const { data } = await authAxiosInstance.get<string[]>(`/api/build/list/${org}/${repo}/branch`);
  return data;
};

export const getRepoBranches = async (owner: string, repo: string) => {
  const { data } = await authAxiosInstance.get<string[]>(`/api/build/list/${repo}/branch`);
  return data;
};

export const postDeploy = async (body: DeployRequest) => {
  const { data } = await authAxiosInstance.post(`/api/build/deploy`, body);
  return data;
};

export const uploadSQLFile = async (body: FormData) => {
  const { data } = await authAxiosInstance.post(`/test/api/v1/rds/database-1`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getResourceId = async (blueprintId: string) => {
  const { data } = await authAxiosInstance.get(`/api/build/resource/${blueprintId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
};
