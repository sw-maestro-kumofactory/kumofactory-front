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

export type EC2OptionsKeys = keyof EC2Options;

export const EC2OptionKeyList = [
  'instanceType',
  'machineImage',
  'subnetType',
  'availabilityZone',
  'instanceName',
  'securityGroupType',
  'id',
];

export enum AccessScope {
  Public,
  Private,
  Database,
}

export enum AvailabilityZone {
  AP_NORTHEAST_2A,
  AP_NORTHEAST_2C,
}

export enum InstanceType {
  T2Micro = 't2.micro',
  T2Small = 't2.small',
  T2Medium = 't2.medium',
  T2Large = 't2.large',
  T2XLarge = 't2.xlarge',
  T22XLarge = 't2.2xlarge',
  M5Large = 'm5.large',
  M5XLarge = 'm5.xlarge',
  M52XLarge = 'm5.2xlarge',
  M54XLarge = 'm5.4xlarge',
  M58XLarge = 'm5.8xlarge',
  M512XLarge = 'm5.12xlarge',
  M516XLarge = 'm5.16xlarge',
  M524XLarge = 'm5.24xlarge',
  M5Metal = 'm5.metal',
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
