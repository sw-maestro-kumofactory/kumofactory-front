import { authAxiosInstance } from '@/src/api';
import { BlueprintInfo, BlueprintResponse } from '@/src/types/Blueprint';

export const getTemplateById = async (id: string) => {
  const { data } = await authAxiosInstance.get(`/api/template/${id}`);
  console.log(data);
  return data;
};

export const getTemplateByName = async (name: string) => {
  const { data } = await authAxiosInstance.get(`/api/template/name/${name}`);
};

export const getKumofactoryTemplate = async () => {
  const { data } = await authAxiosInstance.get(`/api/template/kumofactory`);
  return data;
};

export const getAllTemplates = async () => {
  const { data } = await authAxiosInstance.get<BlueprintInfo[]>(`/api/template`);
  return data;
};

export const postWebThreeTier = async (body: any) => {
  const { data } = await authAxiosInstance.post(`/api/template/web-three-tier?provision=true`, body);
  return data;
};

export const postDeployTemplate = async (body: BlueprintResponse, name: string, provision: string): Promise<any> => {
  const { data } = await authAxiosInstance.post<BlueprintResponse>(
    `/api/template?name=${name}&provision=${provision}`,
    body,
    {},
  );
  return data;
};
