import { RDS } from '@/src/types';

export const RDSService = ({ id }: { id: number }): RDS => {
  return {
    id: id,
    x: 0,
    y: 0,
    type: 'RDS',
    options: {
      instanceType: 't2',
      size: 'micro',
      engine: 'MySQL',
    },
  };
};
