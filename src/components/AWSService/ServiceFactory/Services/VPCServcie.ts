import { VPC } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const VPCService = (): VPC => {
  return {
    ...CommonInfo,
    type: 'VPC',
    options: {},
  };
};
