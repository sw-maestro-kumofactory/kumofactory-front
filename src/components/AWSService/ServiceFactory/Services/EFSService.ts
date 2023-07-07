import { EFS } from '@/src/types/Services';

export const EFSService = (): EFS => {
  return {
    id: '0',
    x: 0,
    y: 0,
    type: 'EFS',
    lines: [],
    options: {},
  };
};
