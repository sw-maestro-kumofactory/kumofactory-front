import { S3Options } from '@/src/types/Services';

export const S3Option = (id: string, bucketName: string): S3Options => {
  return { id: id, bucketName: bucketName };
};
export const S3OptionComponent = ({ id }: { id: string }) => {
  return <>S3OptionComponent</>;
};
