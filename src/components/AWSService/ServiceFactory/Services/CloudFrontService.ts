import { CloudFront } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const CloudFrontService = (): CloudFront => {
  return {
    ...CommonInfo,
    type: 'CloudFront',
    options: {},
  };
};
