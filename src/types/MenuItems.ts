import { AccessScope, AvailabilityZone, ServicesString } from '@/src/types/Services';
import { Areas, AreaTypes } from '@/src/types/Area';

interface ServiceItemInterface {
  name: string;
  type: ServicesString;
}

export interface AreaItemInterface {
  name: string;
  type: AreaItemType;
  scope: AccessScope | null;
}

export type AreaItemType = 'VPC' | 'AZ' | 'Subnet';

export type ServiceItemType = Record<string, ServiceItemInterface[]>;
