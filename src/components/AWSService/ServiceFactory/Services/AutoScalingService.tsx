import { AutoScaling } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const AutoScalingService = (): AutoScaling => {
  return {
    ...CommonInfo,
    type: 'AutoScaling',
    options: {},
  };
};
