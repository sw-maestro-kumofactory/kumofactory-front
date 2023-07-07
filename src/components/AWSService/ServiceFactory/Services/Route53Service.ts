import { Route53 } from '@/src/types/Services';

export const Route53Service = (): Route53 => {
  return {
    id: '0',
    x: 0,
    y: 0,
    type: 'Route53',
    lines: [],
  };
};
