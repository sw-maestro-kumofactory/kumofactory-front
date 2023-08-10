import { authAxiosInstance } from '@/src/api';
import { BlueprintInfo, BlueprintResponse, BlueprintScope } from '@/src/types/Blueprint';

export const postBlueprintData = async (body: BlueprintResponse): Promise<any> => {
  const { data } = await authAxiosInstance.post<BlueprintResponse>(`/api/blueprint/aws?provision=false`, body, {});
  return data;
};

export const getBlueprintList = async (): Promise<any> => {
  const { data } = await authAxiosInstance.get<BlueprintInfo[]>(`/api/blueprint/aws/list`);
  return data;
};

export const getBlueprintListById = async (id: string): Promise<BlueprintResponse> => {
  const { data } = await authAxiosInstance.get<BlueprintResponse>(`/api/blueprint/aws/${id}`);
  return data;
};

export const changeBlueprintScope = async (id: string, scope: BlueprintScope) => {
  const { data } = await authAxiosInstance.put<BlueprintResponse>(`/api/blueprint/aws/${id}?scope=${scope}`);
  return data;
};

export const deleteBlueprint = async (id: string) => {
  const { data } = await authAxiosInstance.delete(`/api/blueprint/aws/${id}`);
  return data;
};
