import { Inter } from 'next/font/google';

import { IComponent, ServicesString } from '@/src/types/Services';
import EC2SVG from '@/public/icons/Compute/Arch_Amazon-EC2_64.svg';
import RDSSVG from '@/public/icons/Database/Arch_Amazon-RDS_64.svg';
import S3SVG from '@/public/icons/Storage/Arch_Amazon-Simple-Storage-Service_64.svg';
import Route53SVG from '@/public/icons/Network/Arch_Amazon-Route-53_64.svg';
import WAFSVG from '@/public/icons/Security/Arch_AWS-WAF_64.svg';
import ElastiCacheSVG from '@/public/icons/Database/Arch_Amazon-ElastiCache_64.svg';
import EFSSVG from '@/public/icons/Storage/Arch_Amazon-EFS_64.svg';
import CloudFrontSVG from '@/public/icons/Network/Arch_Amazon-CloudFront_64.svg';
import NATSVG from '@/public/icons/Network/Res_Amazon-VPC_NAT-Gateway_48.svg';
import ELBSVG from '@/public/icons/Network/Arch_Elastic-Load-Balancing_64.svg';
import ALBSVG from '@/public/icons/Network/Res_Elastic-Load-Balancing_Application-Load-Balancer_48.svg';
import NLBSVG from '@/public/icons/Network/Res_Elastic-Load-Balancing_Network-Load-Balancer_48.svg';
import AutoScalingSVG from '@/public/icons/Compute/Arch_Amazon-EC2-Auto-Scaling_64.svg';
import InternetGatewaySVG from '@/public/icons/Visualization/Res_Amazon-VPC_Internet-Gateway_48.svg';
import UserSVG from '@/public/icons/Visualization/Res_User_48_Light.svg';
import SQSSVG from '@/public/icons/Etc/Arch_Amazon-Simple-Queue-Service_64.svg';
import { CommonInfo } from '@/src/components/AWSService/ServiceFactory/CommonInfo';
interface IServiceFactory {
  type: ServicesString;
}

interface ICreateService {
  x: number;
  y: number;
  type: ServicesString;
}

interface IFactory {
  createService: ({ type, x, y }: ICreateService) => IComponent;
  getSvg: ({ type }: IServiceFactory) => React.ReactNode;
}

export class ServiceFactory implements IFactory {
  public createService({ type, x, y }: ICreateService): IComponent {
    return {
      ...CommonInfo,
      x: x + 70,
      y: y + 90,
      type: type,
      options: {},
    };
  }
  public getSvg({ type }: IServiceFactory): React.ReactNode {
    switch (type) {
      case 'EC2':
        return <EC2SVG />;
      case 'RDS_MYSQL':
        return <RDSSVG />;
      case 'S3':
        return <S3SVG />;
      case 'ROUTE53':
        return <Route53SVG />;
      case 'WAF':
        return <WAFSVG />;
      case 'ELASTIC_CACHE':
        return <ElastiCacheSVG />;
      case 'EFS':
        return <EFSSVG />;
      case 'CLOUDFRONT':
        return <CloudFrontSVG />;
      case 'NAT_GATEWAY':
        return <NATSVG />;
      // case 'ELB':
      //   return <ELBSVG />;
      case 'ALB':
        return <ALBSVG />;
      case 'NLB':
        return <NLBSVG />;
      case 'AUTO_SCALING':
        return <AutoScalingSVG />;
      case 'INTERNET_GATEWAY':
        return <InternetGatewaySVG />;
      case 'USER':
        return <UserSVG />;
      case 'SQS':
        return <SQSSVG />;
    }
  }
}

export const ServiceFactoryInstance = new ServiceFactory();
