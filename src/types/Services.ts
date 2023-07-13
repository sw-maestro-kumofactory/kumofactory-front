export interface HasLine {
  lines: string[];
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

export interface ROUTE53Options {}
export interface ROUTE53 extends IComponent {
  options?: ROUTE53Options;
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

export interface ELBOptions {}
export interface ELB extends IComponent {
  options?: ELBOptions;
}

export interface AutoScalingOptions {}

export interface AutoScaling extends IComponent {
  options?: AutoScalingOptions;
}

export type Services = EC2 | RDS | S3 | ROUTE53 | WAF | ElastiCache | CloudFront | EFS | NAT | VPC | ELB | AutoScaling;

export type ServiceOptions =
  | EC2Options
  | RDSOptions
  | S3Options
  | ROUTE53Options
  | WAFOptions
  | ElastiCacheOptions
  | CloudFrontOptions
  | EFSOptions
  | NATOptions
  | VPCOptions
  | ELBOptions
  | AutoScalingOptions;
export type ServicesString =
  | 'EC2'
  | 'RDS'
  | 'S3'
  | 'ROUTE53'
  | 'WAF'
  | 'ElastiCache'
  | 'CloudFront'
  | 'EFS'
  | 'NAT_GATEWAY'
  | 'VPC'
  | 'ELB'
  | 'AutoScaling';
