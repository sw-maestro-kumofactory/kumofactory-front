import { ElastiCache } from '@/src/types/Services';

export const ElastiCacheService = (): ElastiCache => {
  return {
    id: '0',
    x: 0,
    y: 0,
    type: 'ElastiCache',
    lines: [],
    options: {},
  };
};
