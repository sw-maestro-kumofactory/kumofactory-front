import { authAxiosInstance } from '@/src/api';
import { BlueprintInfo, BlueprintResponse, BlueprintScope } from '@/src/types/Blueprint';

export const postTemplateData = async (body: BlueprintResponse): Promise<any> => {
  const { data } = await authAxiosInstance.post<BlueprintResponse>(`/api/blueprint/aws?provision=false`, body, {});
  return data;
};

export const getTemplateList = async (): Promise<any> => {
  const { data } = await authAxiosInstance.get<BlueprintInfo[]>(`/api/blueprint/aws/list`);
  return data;
};

export const getTemplateListById = async (id: string): Promise<BlueprintResponse> => {
  const { data } = await authAxiosInstance.get<BlueprintResponse>(`/api/blueprint/aws/${id}`);
  return data;
};

export const putTemplateScope = async (id: string, scope: BlueprintScope) => {
  const { data } = await authAxiosInstance.put<BlueprintResponse>(`/api/blueprint/aws/${id}?scope=${scope}`);
  return data;
};
