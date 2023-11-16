import { BlueprintInfo } from '@/src/types/Blueprint';

export const kumoTemplate: Record<string, BlueprintInfo> = {
  NGINXWebserver: {
    id: 0, // for load blueprint
    uuid: 'NGINXWebserver',
    name: 'Amazon EC2 Linux NGINX Webserver',
    description: 'Amazon EC2 Linux NGINX Webserver',
    username: 'KumoFactory',
    downloadCount: 0,
    scope: 'KUMOFACTORY',
    createdAt: '2021-08-31T07:00:00.000Z',
    updatedAt: '2021-08-31T07:00:00.000Z',
    status: 'PENDING',
    staticImage: '/icons/Template/NginxWebserver.png',
  },
};
