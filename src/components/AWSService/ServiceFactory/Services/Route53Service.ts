import { Route53 } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const Route53Service = (): Route53 => {
  return {
    ...CommonInfo,
    type: 'Route53',
  };
};
