import { BlueprintInfo } from '@/src/types/Blueprint';

export const kumoTemplate: Record<string, BlueprintInfo> = {
  Amazon_EC2_Linux_NGINX_Webserver: {
    id: 0, // for load blueprint
    uuid: 'Amazon_EC2_Linux_NGINX_Webserver',
    name: 'Amazon EC2 Linux NGINX Webserver',
    description: 'Amazon EC2 Linux NGINX Webserver',
    username: 'KumoFactory',
    downloadCount: 0,
    scope: 'PUBLIC',
    createdAt: '2021-08-31T07:00:00.000Z',
    updatedAt: '2021-08-31T07:00:00.000Z',
    status: 'PENDING',
    staticImage: '/icons/Template/Amazon_EC2_Linux_NGINX_Webserver.png',
    isTemplate: true,
  },
};
