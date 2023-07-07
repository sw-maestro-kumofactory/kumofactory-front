import { WAF } from '@/src/types/Services';

export const WAFService = (): WAF => {
  return {
    id: '0',
    x: 0,
    y: 0,
    type: 'WAF',
    lines: [],
    options: {},
  };
};
