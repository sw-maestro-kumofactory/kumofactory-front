import { EC2, RDS, S3, Services } from '@/src/types';

import { EC2Service } from '@/src/components/AWSService/ServiceFactory/Services/EC2Service';
import { RDSService } from '@/src/components/AWSService/ServiceFactory/Services/RDSService';
import { S3Service } from '@/src/components/AWSService/ServiceFactory/Services/S3Service';

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
      default:
        return EC2Service();
    }
  }
}
