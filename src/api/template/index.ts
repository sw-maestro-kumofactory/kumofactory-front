import { axiosInstance } from '@/src/api';
import { IComponent } from '@/src/types/Services';
import { Line } from '@/src/types/Line';

export interface IBlueprintResponse {
  name: string;
  components: Omit<IComponent, 'lines'>[];
  links: Line[];
}

export const getTemplateData = async (): Promise<any> => {
  const { data } = await axiosInstance.get(`/api/blueprint/aws`, {}).then((res) => {
    return res;
  });
  console.log(data);
  return data;
};

export const postTemplateData = async (data: any): Promise<any> => {
  const { d } = await axiosInstance.post(`/api/blueprint/aws`, data).then((res) => {
    return res;
  });
  console.log(d);
  return d;
};
