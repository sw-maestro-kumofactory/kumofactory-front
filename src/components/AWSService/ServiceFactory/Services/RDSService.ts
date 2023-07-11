import { RDS } from '@/src/types/Services';

export const RDSService = (): RDS => {
  return {
    id: '0',
    x: 0,
    y: 0,
    type: 'RDS',
    lines: [],
    linkedPoints: [],
    options: {
      instanceType: 't2',
      size: 'micro',
      engine: 'MySQL',
    },
  };
};
