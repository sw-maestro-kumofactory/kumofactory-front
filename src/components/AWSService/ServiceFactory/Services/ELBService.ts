import { ELB } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const ELBService = (): ELB => {
  return {
    ...CommonInfo,
    type: 'ELB',
    options: {},
  };
};
