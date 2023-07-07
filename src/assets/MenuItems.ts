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
    {
      name: 'EFS',
      type: 'EFS',
    },
  ],
  Database: [
    {
      name: 'RDS',
      type: 'RDS',
    },
    {
      name: 'ElastiCache',
      type: 'ElastiCache',
    },
  ],
  Network: [
    {
      name: 'Route53',
      type: 'Route53',
    },
    {
      name: 'CloudFront',
      type: 'CloudFront',
    },
  ],
  Security: [
    {
      name: 'WAF',
      type: 'WAF',
    },
  ],
};
