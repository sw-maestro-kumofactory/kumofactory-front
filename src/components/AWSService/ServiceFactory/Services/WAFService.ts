import { WAF } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const WAFService = (): WAF => {
  return {
    ...CommonInfo,
    type: 'WAF',
    options: {},
  };
};
