import { VPC } from '@/src/types/Services';

export const VPCService = (): VPC => {
  return {
    id: '0',
    x: 0,
    y: 0,
    type: 'VPC',
    lines: [],
    options: {},
  };
};
