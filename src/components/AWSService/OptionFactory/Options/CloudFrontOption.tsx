import { CloudFrontOptions } from '@/src/types/Services';
import { CommonOptions } from '@/src/components/AWSService/OptionFactory/CommonOptions';
export const CloudFrontOption = (id: string): CloudFrontOptions => {
  return { id: id };
};

export const CloudFrontOptionComponent = ({ id }: { id: string }) => {
  return <></>;
};
