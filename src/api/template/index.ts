import { authAxiosInstance } from '@/src/api';

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
  const { data } = await authAxiosInstance.get(`/api/template`);
  return data;
};
