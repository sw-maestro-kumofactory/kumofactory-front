import { EC2 } from '@/src/types';

export const EC2Service = ({ id }: { id: number }): EC2 => {
  return {
    id: id,
    x: 0,
    y: 0,
    type: 'EC2',
    options: {
      instanceType: 't2',
      size: 'micro',
      securityGroup: {
        IPVersion: 'IPv4',
        type: 'SSH',
        protocol: 'TCP',
        port: 8080,
      },
      vpc: '12345',
      platform: 'Amazon Linux',
    },
  };
};
