import { WAFOptions } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/CommonInfo';

export const WAFOption = (id: string): WAFOptions => {
  return { id: id };
};
export const WAFOptionComponent = ({ id }: { id: string }) => {
  return <></>;
};
