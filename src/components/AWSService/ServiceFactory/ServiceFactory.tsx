import { EC2, RDS, S3, Services } from '@/src/types';

import { EC2Service } from '@/src/components/AWSService/ServiceFactory/Services/EC2Service';
import { RDSService } from '@/src/components/AWSService/ServiceFactory/Services/RDSService';
import { S3Service } from '@/src/components/AWSService/ServiceFactory/Services/S3Service';

interface IServiceFactory {
  type: string;
  id: number;
}

interface IFactory {
  createService: ({ type, id }: IServiceFactory) => Services;
}

export class ServiceFactory implements IFactory {
  public createService({ type, id }: IServiceFactory): Services {
    switch (type) {
      case 'EC2':
        return EC2Service({ id: id });
      case 'RDS':
        return RDSService({ id: id });
      case 'S3':
        return S3Service({ id: id });
      default:
        return EC2Service({ id: id });
    }
  }
}
