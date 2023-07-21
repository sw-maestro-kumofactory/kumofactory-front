export interface IArea {
  id: string;
  width: number;
  height: number;
  x: number; // left top x
  y: number; // left top y
  type: AreaString;
}

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

export type Areas = VPC | AvailableZone | PrivateSubnet | PublicSubnet;
export type AreaString = 'VPC' | 'AvailableZone' | 'PrivateSubnet' | 'PublicSubnet';
