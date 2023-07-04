import { S3 } from '@/src/types/Services';

export const S3Service = (): S3 => {
  return {
    id: '0',
    x: 0,
    y: 0,
    type: 'S3',
    lines: [],
    options: {
      bucketName: 'Temp',
    },
  };
};
