import { authAxiosInstance } from '@/src/api';
import { BlueprintInfo, BlueprintResponse, BlueprintScope } from '@/src/types/Blueprint';
import { CostResponse } from '@/src/types/Cost';

export const postSaveBlueprintData = async (body: BlueprintResponse): Promise<any> => {
  const { data } = await authAxiosInstance.post<BlueprintResponse>(`/api/blueprint/aws?provision=false`, body, {});
  return data;
};

export const postDeployBlueprintData = async (body: BlueprintResponse): Promise<any> => {
  const { data } = await authAxiosInstance.post<BlueprintResponse>(`/api/blueprint/aws?provision=true`, body, {});
  return data;
};

export const getBlueprintList = async (): Promise<BlueprintInfo[]> => {
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

export const getBlueprintDeployStatus = async (id: string) => {
  const { data } = await authAxiosInstance.get(`/api/blueprint/aws/status/${id}`);
  return data;
};

export const getCostOfBlueprint = async (id: string): Promise<CostResponse> => {
  const { data } = await authAxiosInstance.get<CostResponse>(`/api/blueprint/cost/${id}`);
  return data;
};
