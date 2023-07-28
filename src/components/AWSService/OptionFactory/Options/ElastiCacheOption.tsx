import { ElastiCacheOptions } from '@/src/types/Services';

export const ElastiCacheOption = (id: string): ElastiCacheOptions => {
  return { id: id };
};
export const ElastiCacheOptionComponent = ({ id }: { id: string }) => {
  return <>ElastiCacheOptionComponent</>;
};
