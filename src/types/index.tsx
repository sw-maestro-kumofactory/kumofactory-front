export interface IComponent {
  id: number;
  x: number;
  y: number;
  type: ServicesString;
}

export interface EC2 extends IComponent {
  options: {
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
  };
}

export interface RDS extends IComponent {
  options: {
    instanceType: string;
    engine: string;
    size: string;
  };
}

export interface S3 extends IComponent {
  options: {
    bucketName: string;
  };
}

export type Services = EC2 | RDS | S3;
export type ServicesString = 'EC2' | 'RDS' | 'S3';
