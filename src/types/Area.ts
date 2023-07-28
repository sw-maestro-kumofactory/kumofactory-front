import { AccessScope, AvailabilityZone } from '@/src/types/Services';

export interface IArea {
  id: string;
  width: number;
  height: number;
  x: number; // left top x
  y: number; // left top y
  type: AreaTypes;
}

export type AreaTypes = Exclude<AccessScope | 'VPC' | AvailabilityZone, null>;

export interface CommonAreaOptions {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface IAvailabilityZone extends CommonAreaOptions {
  type: AvailabilityZone;
}

export interface ISubnet extends CommonAreaOptions {
  type: AccessScope;
}

export interface IVpc extends CommonAreaOptions {
  type: 'VPC';
}

export type Areas = IAvailabilityZone | ISubnet | IVpc;

export interface VPCOptions {}
export interface VPC extends IArea {
  options?: VPCOptions;
}

export interface AvailableZoneOptions {}
export interface AvailableZone extends IArea {
  options?: AvailableZoneOptions;
}

export interface SubnetOptions {}
export interface PrivateSubnet extends IArea {
  options?: SubnetOptions;
}

export interface PublicSubnet extends IArea {
  options?: SubnetOptions;
}
