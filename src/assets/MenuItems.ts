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
      type: 'RDS_MYSQL',
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
      name: 'ALB',
      type: 'ALB',
    },
    {
      name: 'NLB',
      type: 'NLB',
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
    scope: null,
  },
  {
    name: 'Public Subnet',
    type: 'Subnet',
    scope: 'Public',
  },
  {
    name: 'Private Subnet',
    type: 'Subnet',
    scope: 'Private',
  },
  {
    name: 'AZ',
    type: 'AZ',
    scope: null,
  },
];
