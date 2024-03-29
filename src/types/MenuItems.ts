import { AccessScope, AvailabilityZone, ServicesString } from '@/src/types/Services';
import { Areas, AreaTypes } from '@/src/types/Area';

export interface ServiceItemInterface {
  name: string;
  type: Partial<ServicesString>;
}

export interface AreaItemInterface {
  name: string;
  type: AreaItemType;
  scope: AccessScope | null;
}

export type AreaItemType = 'VPC' | 'AZ' | 'SUBNET';

export type ServiceItemType = Record<string, ServiceItemInterface[]>;
