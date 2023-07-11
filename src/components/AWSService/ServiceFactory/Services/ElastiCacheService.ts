import { ElastiCache } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const ElastiCacheService = (): ElastiCache => {
  return {
    ...CommonInfo,
    type: 'ElastiCache',
    options: {},
  };
};
