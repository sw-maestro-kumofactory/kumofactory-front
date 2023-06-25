import { S3 } from '@/src/types';

export const S3Service = ({ id }: { id: number }): S3 => {
  return {
    id: id,
    x: 0,
    y: 0,
    type: 'S3',
    options: {
      bucketName: 'Temp',
    },
  };
};
