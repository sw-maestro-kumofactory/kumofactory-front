export interface HasLine {
  lines: string[];
}

export interface IComponent extends HasLine {
  id: string;
  x: number;
  y: number;
  type: ServicesString;
  option: {};
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

const AccessScope = {
  Public: 'Public',
  Private: 'Private',
  Database: 'Database',
} as const;

export type AccessScope = (typeof AccessScope)[keyof typeof AccessScope] | null;

export const AccessScopeList = [AccessScope.Public, AccessScope.Private, AccessScope.Database];

const AvailabilityZone = {
  AP_NORTHEAST_2A: 'ap-northeast-2a',
  AP_NORTHEAST_2C: 'ap-northeast-2c',
} as const;

export type AvailabilityZone = (typeof AvailabilityZone)[keyof typeof AvailabilityZone] | null;

export const AvailabilityZoneList = [AvailabilityZone.AP_NORTHEAST_2A, AvailabilityZone.AP_NORTHEAST_2C];

const InstanceType = {
  T3Micro: 't3.micro',
  T3Small: 't3.small',
  T3Medium: 't3.medium',
  T3Large: 't3.large',
  T3XLarge: 't3.xlarge',
  T32XLarge: 't3.2xlarge',
  M5Large: 'm5.large',
  M5XLarge: 'm5.xlarge',
  M52XLarge: 'm5.2xlarge',
  M54XLarge: 'm5.4xlarge',
  M58XLarge: 'm5.8xlarge',
  M512XLarge: 'm5.12xlarge',
  M516XLarge: 'm5.16xlarge',
  M524XLarge: 'm5.24xlarge',
  M5Metal: 'm5.metal',
} as const;

export type InstanceType = (typeof InstanceType)[keyof typeof InstanceType];

export const InstanceTypeList = [
  InstanceType.T3Micro,
  InstanceType.T3Small,
  InstanceType.T3Medium,
  InstanceType.T3Large,
  InstanceType.T3XLarge,
  InstanceType.T32XLarge,
  InstanceType.M5Large,
  InstanceType.M5XLarge,
  InstanceType.M52XLarge,
  InstanceType.M54XLarge,
  InstanceType.M58XLarge,
  InstanceType.M512XLarge,
  InstanceType.M516XLarge,
  InstanceType.M524XLarge,
  InstanceType.M5Metal,
];

// 요청 보낼 때 Data set
export interface RdsStackType {
  secret: SecretType;
  instance: RDSOptions;
}

// For Secret Manager

export interface RDSOptions {
  id: string;
  secret: SecretType;
  instance: RDSInstanceType;
}

export interface SecretType {
  id?: string;
  secretName?: string;
  username?: string; // rds 접속 username mysql -uroot
  password?: string; // rds 접속 password
}

// For RDS instance 관련
export interface RDSInstanceType {
  id: string;
  databaseName: string; // 기본 데이터 베이스 이름 (CREATE DATABASE ${databaseName} 이게 동작하는 듯
  instanceIdentifier: string; // 대시보드에 뜨는 구분자 이름
  instanceType: InstanceType; // ec2 instance type 과 동일
  version: MySqlEngineVersionType;
}

export const MySqlEngineVersionType = {
  VER_8_0_33: 'VER_8_0_33',
  VER_8_0_32: 'VER_8_0_32',
  VER_8_0_31: 'VER_8_0_31',
  VER_8_0_30: 'VER_8_0_30',
  VER_8_0_28: 'VER_8_0_28',
  VER_8_0_27: 'VER_8_0_27',
  VER_8_0_26: 'VER_8_0_26',
};

export type MySqlEngineVersionType = (typeof MySqlEngineVersionType)[keyof typeof MySqlEngineVersionType];

export const MySqlEngineVersionTypeList = [
  MySqlEngineVersionType.VER_8_0_33,
  MySqlEngineVersionType.VER_8_0_32,
  MySqlEngineVersionType.VER_8_0_31,
  MySqlEngineVersionType.VER_8_0_30,
  MySqlEngineVersionType.VER_8_0_28,
  MySqlEngineVersionType.VER_8_0_27,
  MySqlEngineVersionType.VER_8_0_26,
];

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
  id: string; // load balancer id
  port: number; // for listener
  targetGroupPort: number; // for target group
  targetGroupId: string;
  targetGroupName: string;
  healthCheckPath: string; // url for health check ex) "/"
  name: string; // loadBalancerName
  listenerId: string; // listener id
}

export interface NLBOptions extends ELBOptions {}

export interface ALBOptions extends ELBOptions {}

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
  | AutoScalingOptions
  | NLBOptions
  | ALBOptions;

export type ServicesString =
  | 'EC2'
  | 'RDS_MYSQL'
  | 'S3'
  | 'ROUTE53'
  | 'WAF'
  | 'ElastiCache'
  | 'CloudFront'
  | 'EFS'
  | 'NAT_GATEWAY'
  | 'ELB'
  | 'AutoScaling'
  | 'NLB'
  | 'ALB';
