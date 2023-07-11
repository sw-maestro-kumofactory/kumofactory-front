export interface HasLine {
  lines: string[];
  linkedPoints: string[];
}

export interface IComponent extends HasLine {
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

export interface Route53Options {}
export interface Route53 extends IComponent {
  options?: Route53Options;
}

export interface WAFOptions {}
export interface WAF extends IComponent {
  options?: WAFOptions;
}

export interface ElastiCacheOptions {}

export interface ElastiCache extends IComponent {
  options?: ElastiCacheOptions;
}

export interface CloudFrontOptions {}

export interface CloudFront extends IComponent {
  options?: CloudFrontOptions;
}

export interface EFSOptions {}

export interface EFS extends IComponent {
  options?: EFSOptions;
}

export interface NATOptions {}
export interface NAT extends IComponent {
  options?: NATOptions;
}

export interface VPCOptions {}
export interface VPC extends IComponent {
  options?: VPCOptions;
}
export type Services = EC2 | RDS | S3 | Route53 | WAF | ElastiCache | CloudFront | EFS | NAT | VPC;
export type ServiceOptions =
  | EC2Options
  | RDSOptions
  | S3Options
  | Route53Options
  | WAFOptions
  | ElastiCacheOptions
  | CloudFrontOptions
  | EFSOptions
  | NATOptions
  | VPCOptions;
export type ServicesString =
  | 'EC2'
  | 'RDS'
  | 'S3'
  | 'Route53'
  | 'WAF'
  | 'ElastiCache'
  | 'CloudFront'
  | 'EFS'
  | 'NAT'
  | 'VPC';
