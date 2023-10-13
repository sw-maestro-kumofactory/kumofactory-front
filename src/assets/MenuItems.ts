import { AreaItemInterface, ServiceItemType } from '@/src/types/MenuItems';

export const MenuItemList: ServiceItemType = {
  Visualization: [
    {
      name: 'User',
      type: 'USER',
    },
  ],
  Compute: [
    {
      name: 'EC2',
      type: 'EC2',
    },
    {
      name: 'AutoScaling',
      type: 'AUTO_SCALING',
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
      type: 'ELASTIC_CACHE',
    },
  ],
  Network: [
    {
      name: 'Internet_gateway',
      type: 'INTERNET_GATEWAY',
    },
    {
      name: 'ROUTE53',
      type: 'ROUTE53',
    },
    {
      name: 'CloudFront',
      type: 'CLOUDFRONT',
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
    type: 'SUBNET',
    scope: 'PUBLIC',
  },
  {
    name: 'Private Subnet',
    type: 'SUBNET',
    scope: 'PRIVATE',
  },
  {
    name: 'AZ',
    type: 'AZ',
    scope: null,
  },
];
