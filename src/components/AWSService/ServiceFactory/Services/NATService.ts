import { NAT } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const NATService = (): NAT => {
  return {
    ...CommonInfo,
    type: 'NAT',
    options: {},
  };
};
