import { EC2Options } from '@/src/types/Services';

export const EC2Option = (id: string): EC2Options => {
  return {
    instanceType: 't2.micro',
    machineImage: '',
    subnetType: 0,
    availabilityZone: 0,
    instanceName: id,
    id: id,
    securityGroupType: 0,
  };
};
