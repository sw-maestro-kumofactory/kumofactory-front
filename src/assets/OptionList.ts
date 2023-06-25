export const OptionList = {
  EC2: {
    instanceType: ['t2', 'm5d', 'c5d'],
    size: ['micro', 'small', 'medium', 'large'],
    // securityGroup: {
    //   IPVersion: ['IPv4', 'IPv6'],
    //   type: ['SSH', 'FTP', 'SFTP'],
    //   protocol: ['TCP', 'UDP', 'HTTP', 'HTTPS'],
    // },
    vpc: ['vpc-1234567890, vpc-0987654321'],
    platform: ['Amazon Linux 2023 AMI', 'Ubuntu 2023 AMI'],
  },
  RDS: {
    instanceType: ['db.t2', 'db.m5d', 'db.c5d'],
    engine: ['MySQL', 'MariaDB', 'PostgreSQL'],
    size: ['100GiB', '200GiB', '300GiB'],
  },
  S3: {
    bucketName: ['Temp', 'Temp2', 'Temp3'],
  },
};
