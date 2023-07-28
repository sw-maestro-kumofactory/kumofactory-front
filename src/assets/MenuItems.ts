import { AreaItemInterface, ServiceItemType } from '@/src/types/MenuItems';

export const MenuItemList: ServiceItemType = {
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

export const AreaItemList: AreaItemInterface[] = [
  {
    name: 'VPC',
    type: 'VPC',
  },
  {
    name: 'PublicSubnet',
    type: 'Public',
  },
  {
    name: 'PrivateSubnet',
    type: 'Private',
  },
  {
    name: 'AZ',
    type: 'ap-northeast-2a',
  },
];
