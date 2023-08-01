import { authAxiosInstance } from '@/src/api';
import { DeployRequest, DeployResponse } from '@/src/types/Deploy';

export const getUserRepositories = async (username: string) => {
  const { data } = await authAxiosInstance.get<DeployResponse>(`/test/build/list/${username}`);
  return data;
};

export const getOrgRepositories = async (org: string) => {
  const { data } = await authAxiosInstance.get(`/test/build/list/${org}/repo`);
  return data;
};

export const getBranches = async (owner: string, repo: string) => {
  const { data } = await authAxiosInstance.get<string[]>(`/test/build/list/${owner}/${repo}/branch`);
  return data;
};

export const postDeploy = async (body: DeployRequest) => {
  const { data } = await authAxiosInstance.post(`/test/build/deploy`, body);
  return data;
};
