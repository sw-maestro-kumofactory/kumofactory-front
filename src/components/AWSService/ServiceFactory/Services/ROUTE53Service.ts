import { ROUTE53 } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const ROUTE53Service = (): ROUTE53 => {
  return {
    ...CommonInfo,
    type: 'ROUTE53',
  };
};
