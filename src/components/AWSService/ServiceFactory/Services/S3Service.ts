import { S3 } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const S3Service = (): S3 => {
  return {
    ...CommonInfo,
    type: 'S3',
    options: {
      bucketName: 'Temp',
    },
  };
};
