import { authAxiosInstance } from '@/src/api';
import { DeployRequest, DeployResponse, PersonalRepoResponse, RecourseResponse, Resource } from '@/src/types/Deploy';

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

export const getRepoInfo = async (id: string) => {
  const { data } = await authAxiosInstance.get(`/api/build/info?instanceId=${id}`);
  return data;
};

export const postDeploy = async (body: DeployRequest) => {
  const { data } = await authAxiosInstance.post(`/api/build/deployAsync/v2`, body);
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
  const { data } = await authAxiosInstance.get<RecourseResponse>(`/api/build/resource/${blueprintId}`);
  const newObj: Record<string, Resource> = {};
  console.log(data)
  Object.keys(data.result).forEach((key) => {
    newObj[data.result[key].uuid] = data.result[key];
  });
  data.result = newObj;
  return data;
};
