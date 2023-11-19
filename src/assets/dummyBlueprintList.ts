import { BlueprintInfo } from '@/src/types/Blueprint';

export const dummyBlueprintList: BlueprintInfo[] = [
  {
    id: 70,
    uuid: '0c0fdb80-7a8c-11ee-bac6-2b6d7e9a1267',
    name: '231104',
    description: '### This architecture is made for Application test\n#### 구성\nEC2 - name : ApplicationDeployEC2',
    downloadCount: 2,
    scope: 'PUBLIC',
    createdAt: '2023-11-03T21:02:15.968+00:00',
    updatedAt: '2023-11-17T14:21:02.884+00:00',
    presignedUrl:
      'https://kumo-thumbnail.s3.ap-northeast-2.amazonaws.com/59858440/0c0fdb80-7a8c-11ee-bac6-2b6d7e9a1267.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231118T115914Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAWKE7NUBXC47IZYXL%2F20231118%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=274a3d5c8737352e6166a5c24735e798d0f241cd206927ce5ce3e6d9798c3dd3',
    status: 'SUCCESS',
    isTemplate: false,
  },
  {
    id: 72,
    uuid: '8fc242a0-7ed9-11ee-93f7-0d80f2202512',
    name: '2 Public EC2 Template',
    description:
      '## This is Test template \n**2 EC2 instance**\n- name1 : testInstance1_1109 - t2.micro     \n- name2 : testInstance2_1109 - t2.micro',
    downloadCount: 1,
    scope: 'PUBLIC',
    createdAt: '2023-11-09T08:28:32.994+00:00',
    updatedAt: '2023-11-17T14:31:07.413+00:00',
    presignedUrl:
      'https://kumo-thumbnail.s3.ap-northeast-2.amazonaws.com/59858440/8fc242a0-7ed9-11ee-93f7-0d80f2202512.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231118T115914Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAWKE7NUBXC47IZYXL%2F20231118%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=43d2a03d27f48ab3bb8c09598a05f578905de590f1e1328c77e02ef3ed243a4c',
    status: 'SUCCESS',
    isTemplate: false,
  },
  {
    id: 73,
    uuid: '7626d9c0-73b0-11ee-8ffe-756557eab3ca',
    name: '20231026',
    description: '### Information\nThis architecture is made for testing api and design',
    downloadCount: 7,
    scope: 'PUBLIC',
    createdAt: '2023-11-12T05:59:13.816+00:00',
    updatedAt: '2023-11-18T06:49:54.059+00:00',
    presignedUrl:
      'https://kumo-thumbnail.s3.ap-northeast-2.amazonaws.com/59858440/7626d9c0-73b0-11ee-8ffe-756557eab3ca.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231118T115914Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAWKE7NUBXC47IZYXL%2F20231118%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=728cbb22784b62968a70f9f8ee32bad3766df38180f2031599dd1f027a2b7887',
    status: 'SUCCESS',
    isTemplate: false,
  },
  {
    id: 74,
    uuid: '4a97a2b0-8555-11ee-8c1c-972b3f96daad',
    name: 'Simple Architecture',
    description:
      '#### This is Simple Architecture\n\n이 아키텍처는 1개의 EC2, 1개의 RDS, 1개의 S3로 구성된 아키텍처입니다..',
    downloadCount: 0,
    scope: 'PRIVATE',
    createdAt: '2023-11-17T14:28:26.942+00:00',
    updatedAt: '2023-11-17T14:28:26.942+00:00',
    presignedUrl:
      'https://kumo-thumbnail.s3.ap-northeast-2.amazonaws.com/59858440/4a97a2b0-8555-11ee-8c1c-972b3f96daad.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231118T115914Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIAWKE7NUBXC47IZYXL%2F20231118%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=1824e95263812b781a8c65b952451429f7f2f20666737f84322d0dcff4b7f815',
    status: 'PENDING',
    isTemplate: false,
  },
  {
    id: 12345,
    uuid: 'Amazon_EC2_Linux_NGINX_Webserver',
    name: 'Amazon EC2 Linux NGINX Webserver',
    description: 'Amazon EC2 Linux NGINX Webserver',
    username: 'KumoFactory',
    downloadCount: 0,
    scope: 'PUBLIC',
    createdAt: '2021-08-31T07:00:00.000Z',
    updatedAt: '2021-08-31T07:00:00.000Z',
    status: 'SUCCESS',
    isTemplate: true,
    templateName: 'Amazon_EC2_Linux_NGINX_Webserver',
  },
];
