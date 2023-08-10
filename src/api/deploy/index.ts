import { authAxiosInstance } from '@/src/api';
import { DeployRequest, DeployResponse } from '@/src/types/Deploy';

export const getUserRepositories = async () => {
  const { data } = await authAxiosInstance.get<DeployResponse>(`/api/build/list`);
  return data;
};

export const getOrgRepositories = async (org: string) => {
  const { data } = await authAxiosInstance.get(`/test/build/list/${org}/repo`);
  return data;
};

export const getOrgRepoBranches = async (org: string, repo: string) => {
  const { data } = await authAxiosInstance.get<string[]>(`/test/build/list/${org}/${repo}/branch`);
  return data;
};

export const getRepoBranches = async (owner: string, repo: string) => {
  const { data } = await authAxiosInstance.get<string[]>(`/test/build/list/${repo}/branch`);
  return data;
};

export const postDeploy = async (body: DeployRequest) => {
  const { data } = await authAxiosInstance.post(`/test/build/deploy`, body);
  return data;
};
