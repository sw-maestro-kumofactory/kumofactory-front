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
  instanceType: string; // ex) t2.micro -> type, size로 분류
  machineImage: string; // amazon linux 2023 으로 고정되어 있어서 일단 "" 로 보내면 됨
  subnetType: AccessScope;
  availabilityZone: AvailabilityZone;
  instanceName: string;
  securityGroupType: AccessScope;
  id: string; // instance name id : "TestInstance" 임
}

export enum AccessScope {
  Public,
  Private,
  Database,
}

export enum AvailabilityZone {
  AP_NORTHEAST_2A,
  AP_NORTHEAST_2C,
}

export interface RDSOptions {
  id: string;
}

export interface S3Options {
  id: string;
}

export interface ROUTE53Options {
  id: string;
}
export interface WAFOptions {
  id: string;
}
export interface ElastiCacheOptions {
  id: string;
}

export interface CloudFrontOptions {
  id: string;
}

export interface EFSOptions {
  id: string;
}

export interface NATOptions {
  id: string;
}

export interface ELBOptions {
  id: string;
}

export interface AutoScalingOptions {
  id: string;
}

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
  | 'ELB'
  | 'AutoScaling';
