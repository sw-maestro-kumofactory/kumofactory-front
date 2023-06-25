export const ServiceOptions = {
  EC2: {
    instanceType: 't2',
    size: 'micro',
    securityGroup: {
      IPVersion: 'IPv4',
      type: 'SSH',
      protocol: 'TCP',
    },
    vpc: '',
    platform: 'Amazon Linux 2023 AMI',
  },
  RDS: {
    instanceType: 'm5d',
    engine: 'MySQL',
    size: '100GiB',
  },
  S3: {
    bucketName: 'Temp',
  },
};
