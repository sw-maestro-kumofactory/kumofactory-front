import { EFS } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const EFSService = (): EFS => {
  return {
    ...CommonInfo,
    type: 'EFS',
    options: {},
  };
};
