import { EC2Option, EC2OptionComponent } from '@/src/components/AWSService/OptionFactory/Options/EC2Option';
import { RDSOption, RDSOptionComponent } from '@/src/components/AWSService/OptionFactory/Options/RDSOption';
import { S3Option, S3OptionComponent } from '@/src/components/AWSService/OptionFactory/Options/S3Option';
import { ROUTE53Option, ROUTE53OptionComponent } from '@/src/components/AWSService/OptionFactory/Options/ROUTE53Option';
import { WAFOption, WAFOptionComponent } from '@/src/components/AWSService/OptionFactory/Options/WAFOption';
import {
  ElastiCacheOption,
  ElastiCacheOptionComponent,
} from '@/src/components/AWSService/OptionFactory/Options/ElastiCacheOption';
import { EFSOption, EFSOptionComponent } from '@/src/components/AWSService/OptionFactory/Options/EFSOption';
import {
  CloudFrontOption,
  CloudFrontOptionComponent,
} from '@/src/components/AWSService/OptionFactory/Options/CloudFrontOption';
import { NATOption, NATOptionComponent } from '@/src/components/AWSService/OptionFactory/Options/NATOption';
import { ELBOption, ELBOptionComponent } from '@/src/components/AWSService/OptionFactory/Options/ELBOption';
import {
  AutoScalingOption,
  AutoScalingOptionComponent,
} from '@/src/components/AWSService/OptionFactory/Options/AutoScalingOption';
import { ServiceOptions, ServicesString } from '@/src/types/Services';
import { ALBOption, ALBOptionComponent } from '@/src/components/AWSService/OptionFactory/Options/ALBOption';

interface IFactory {
  createOption: (type: ServicesString, id: string) => ServiceOptions;
  getFormOfService: (type: ServicesString, id: string) => React.ReactNode;
}

export class OptionFactory implements IFactory {
  public createOption(type: ServicesString, id: string): ServiceOptions {
    switch (type) {
      case 'EC2':
        return EC2Option(id);
      case 'RDS':
        return RDSOption(id);
      case 'S3':
        return S3Option(id);
      case 'ROUTE53':
        return ROUTE53Option(id);
      case 'WAF':
        return WAFOption(id);
      case 'ElastiCache':
        return ElastiCacheOption(id);
      case 'EFS':
        return EFSOption(id);
      case 'CloudFront':
        return CloudFrontOption(id);
      case 'NAT_GATEWAY':
        return NATOption(id);
      case 'ELB':
        return ELBOption(id);
      case 'NLB':
        return ELBOption(id);
      case 'ALB':
        return ALBOption(id);
      case 'AutoScaling':
        return AutoScalingOption(id);
    }
  }
  public getFormOfService(type: ServicesString, id: string): React.ReactNode {
    switch (type) {
      case 'EC2':
        return EC2OptionComponent({ id: id });
      case 'RDS':
        return RDSOptionComponent({ id: id });
      case 'S3':
        return S3OptionComponent({ id: id });
      case 'ROUTE53':
        return ROUTE53OptionComponent({ id: id });
      case 'WAF':
        return WAFOptionComponent({ id: id });
      case 'ElastiCache':
        return ElastiCacheOptionComponent({ id: id });
      case 'EFS':
        return EFSOptionComponent({ id: id });
      case 'CloudFront':
        return CloudFrontOptionComponent({ id: id });
      case 'NAT_GATEWAY':
        return NATOptionComponent({ id: id });
      case 'ELB':
        return ELBOptionComponent({ id: id });
      case 'ALB':
        return ALBOptionComponent(id);
      case 'NLB':
        return ALBOptionComponent(id);
      case 'AutoScaling':
        return AutoScalingOptionComponent({ id: id });
    }
  }
}

export const OptionFactoryInstance = new OptionFactory();
