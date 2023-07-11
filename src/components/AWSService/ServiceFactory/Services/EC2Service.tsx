import { EC2 } from '@/src/types/Services';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/Services/CommonInfo';

export const EC2Service = (): EC2 => {
  return {
    ...CommonInfo,
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
