import { authAxiosInstance } from '@/src/api';
import { BlueprintInfo, BlueprintResponse } from '@/src/types/Blueprint';

export const postTemplateData = async (body: BlueprintResponse): Promise<any> => {
  const { data } = await authAxiosInstance.post<BlueprintResponse>(`/api/blueprint/aws`, body, {});
  return data;
};

export const getTemplateList = async (): Promise<any> => {
  const { data } = await authAxiosInstance.get<BlueprintInfo[]>(`/api/blueprint/aws/list`);
  return data;
};

export const getTemplateListById = async (id: number): Promise<BlueprintResponse> => {
  const { data } = await authAxiosInstance.get<BlueprintResponse>(`/api/blueprint/aws/${id}`);
  return data;
};
