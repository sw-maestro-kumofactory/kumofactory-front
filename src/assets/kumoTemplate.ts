import { BlueprintInfo } from '@/src/types/Blueprint';

export const kumoTemplate: Record<string, BlueprintInfo> = {
  AWS_EC2_NGINX_WEBSERVER: {
    id: 0, // for load blueprint
    uuid: 'AWS_EC2_NGINX_WEBSERVER',
    name: 'Amazon EC2 Linux NGINX Webserver',
    description: 'AWS EC2 NGINX Webserver Template.',
    username: 'KumoFactory',
    downloadCount: 0,
    scope: 'PRIVATE',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    status: 'PENDING',
    staticImage: '/icons/Template/Amazon_EC2_Linux_NGINX_Webserver.png',
    isTemplate: true,
  },
  FARGATE: {
    id: 1, // for load blueprint
    uuid: 'FARGATE',
    name: 'FARGATE',
    description:
      'This template  deploys a Fargate cluster that is in a VPC with both public and private subnets. Containers can be deployed into either the public subnets or the private subnets, and there are two load balancers.',
    username: 'KumoFactory',
    downloadCount: 0,
    scope: 'PRIVATE',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    status: 'PENDING',
    staticImage: '/icons/Template/Fargate.png',
    isTemplate: true,
  },
  AWS_S3_ReadOnly: {
    id: 1, // for load blueprint
    uuid: 'AWS_S3_ReadOnly',
    name: 'AWS_S3_ReadOnly',
    description:
      'Service Catalog: S3 Reference Architecture: Public read-only bucket accessible from anywhere. Consider alternate options like distributing via CloudFront OAI instead of creating a bucket using this template.',
    username: 'KumoFactory',
    downloadCount: 0,
    scope: 'PRIVATE',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    status: 'PENDING',
    staticImage: '/icons/Template/AWS_S3_ReadOnly.png',
    isTemplate: true,
  },
};
