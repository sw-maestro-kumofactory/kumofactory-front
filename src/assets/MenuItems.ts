import { itemType } from '@/src/types/MenuItems';

export const MenuItemList: itemType = {
  Area: [
    {
      name: 'AZ',
      type: 'AvailableZone',
    },
  ],
  Compute: [
    {
      name: 'EC2',
      type: 'EC2',
    },
  ],
  Storage: [
    {
      name: 'S3',
      type: 'S3',
    },
  ],
  Database: [
    {
      name: 'RDS',
      type: 'RDS',
    },
  ],
};
