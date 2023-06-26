export interface IComponent {
  id: string;
  x: number;
  y: number;
  type: ServicesString;
}

export interface EC2Options {
  instanceType: string;
  size: string;
  securityGroup: {
    IPVersion: string;
    type: 'SSH' | 'FTP' | 'SFTP';
    protocol: 'HTTP' | 'HTTPS' | 'TCP' | 'UDP';
    port: number;
  };
  vpc: string;
  platform: string;
}

export interface EC2 extends IComponent {
  options: EC2Options;
}

export interface RDSOptions {
  instanceType: string;
  engine: string;
  size: string;
}

export interface RDS extends IComponent {
  options: RDSOptions;
}

export interface S3Options {
  bucketName: string;
}

export interface S3 extends IComponent {
  options: S3Options;
}

export type Services = EC2 | RDS | S3;
export type ServiceOptions = EC2Options | RDSOptions | S3Options;
export type ServicesString = 'EC2' | 'RDS' | 'S3';
