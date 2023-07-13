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
    {
      name: 'AutoScaling',
      type: 'AutoScaling',
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
      name: 'ROUTE53',
      type: 'ROUTE53',
    },
    {
      name: 'CloudFront',
      type: 'CloudFront',
    },
    {
      name: 'VPC',
      type: 'VPC',
    },
    {
      name: 'NAT',
      type: 'NAT_GATEWAY',
    },
    {
      name: 'ELB',
      type: 'ELB',
    },
  ],
  Security: [
    {
      name: 'WAF',
      type: 'WAF',
    },
  ],
};
