import { EC2, RDS, S3, Services } from '@/src/types/Services';

import { EC2Service } from '@/src/components/AWSService/ServiceFactory/Services/EC2Service';
import { RDSService } from '@/src/components/AWSService/ServiceFactory/Services/RDSService';
import { S3Service } from '@/src/components/AWSService/ServiceFactory/Services/S3Service';
import { Route53Service } from '@/src/components/AWSService/ServiceFactory/Services/Route53Service';
import { WAFService } from '@/src/components/AWSService/ServiceFactory/Services/WAFService';
import { ElastiCacheService } from '@/src/components/AWSService/ServiceFactory/Services/ElastiCacheService';
import { EFSService } from '@/src/components/AWSService/ServiceFactory/Services/EFSService';
import { CloudFrontService } from '@/src/components/AWSService/ServiceFactory/Services/CloudFrontService';

interface IServiceFactory {
  type: string;
}

interface IFactory {
  createService: ({ type }: IServiceFactory) => Services;
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
      default:
        return EC2Service();
    }
  }
}
