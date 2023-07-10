import { NAT } from '@/src/types/Services';

export const NATService = (): NAT => {
  return {
    id: '0',
    x: 0,
    y: 0,
    type: 'NAT',
    lines: [],
    options: {},
  };
};
