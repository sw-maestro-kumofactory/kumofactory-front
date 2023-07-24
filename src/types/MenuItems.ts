import { ServicesString } from '@/src/types/Services';
import { AreaString } from '@/src/types/Area';

interface ServiceItemInterface {
  name: string;
  type: ServicesString;
}

export interface AreaItemInterface {
  name: string;
  type: AreaString;
}

export type ServiceItemType = Record<string, ServiceItemInterface[]>;
