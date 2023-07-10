import { ServicesString } from '@/src/types/Services';

interface itemInterface {
  name: string;
  type: ServicesString;
}

export type itemType = Record<string, itemInterface[]>;
