import { EC2, RDS, S3, Services, ServicesString } from '@/src/types/Services';
import { EC2Service } from '@/src/components/AWSService/ServiceFactory/Services/EC2Service';
import { RDSService } from '@/src/components/AWSService/ServiceFactory/Services/RDSService';
import { S3Service } from '@/src/components/AWSService/ServiceFactory/Services/S3Service';
import { Route53Service } from '@/src/components/AWSService/ServiceFactory/Services/Route53Service';
import { WAFService } from '@/src/components/AWSService/ServiceFactory/Services/WAFService';
import { ElastiCacheService } from '@/src/components/AWSService/ServiceFactory/Services/ElastiCacheService';
import { EFSService } from '@/src/components/AWSService/ServiceFactory/Services/EFSService';
import { CloudFrontService } from '@/src/components/AWSService/ServiceFactory/Services/CloudFrontService';
import { NATService } from '@/src/components/AWSService/ServiceFactory/Services/NATService';
import { VPCService } from '@/src/components/AWSService/ServiceFactory/Services/VPCServcie';
import EC2SVG from '@/public/icons/Compute/Arch_Amazon-EC2_64.svg';
import RDSSVG from '@/public/icons/Database/Arch_Amazon-RDS_64.svg';
import S3SVG from '@/public/icons/Storage/Arch_Amazon-Simple-Storage-Service_64.svg';
import Route53SVG from '@/public/icons/Network/Arch_Amazon-Route-53_64.svg';
import WAFSVG from '@/public/icons/Security/Arch_AWS-WAF_64.svg';
import ElastiCacheSVG from '@/public/icons/Database/Arch_Amazon-ElastiCache_64.svg';
import EFSSVG from '@/public/icons/Storage/Arch_Amazon-EFS_64.svg';
import CloudFrontSVG from '@/public/icons/Network/Arch_Amazon-CloudFront_64.svg';
import NATSVG from '@/public/icons/Network/Res_Amazon-VPC_NAT-Gateway_48.svg';
import VPCSVG from '@/public/icons/Network/Arch_Amazon-Virtual-Private-Cloud_64.svg';

interface IServiceFactory {
  type: ServicesString;
}

interface IFactory {
  createService: ({ type }: IServiceFactory) => Services;
  getSvg: ({ type }: IServiceFactory) => React.ReactNode;
}

export class ServiceFactory implements IFactory {
  public createService({ type }: IServiceFactory): Services {
    switch (type) {
      case 'EC2':
        return EC2Service();
      case 'RDS':
        return RDSService();
      case 'S3':
        return S3Service();
      case 'Route53':
        return Route53Service();
      case 'WAF':
        return WAFService();
      case 'ElastiCache':
        return ElastiCacheService();
      case 'EFS':
        return EFSService();
      case 'CloudFront':
        return CloudFrontService();
      case 'NAT':
        return NATService();
      case 'VPC':
        return VPCService();
    }
  }
  public getSvg({ type }: IServiceFactory): React.ReactNode {
    switch (type) {
      case 'EC2':
        return <EC2SVG />;
      case 'RDS':
        return <RDSSVG />;
      case 'S3':
        return <S3SVG />;
      case 'Route53':
        return <Route53SVG />;
      case 'WAF':
        return <WAFSVG />;
      case 'ElastiCache':
        return <ElastiCacheSVG />;
      case 'EFS':
        return <EFSSVG />;
      case 'CloudFront':
        return <CloudFrontSVG />;
      case 'NAT':
        return <NATSVG />;
      case 'VPC':
        return <VPCSVG />;
    }
  }
}
