import { EC2Option } from '@/src/components/AWSService/OptionFactory/Options/EC2Option';
import { RDSOption } from '@/src/components/AWSService/OptionFactory/Options/RDSOption';
import { S3Option } from '@/src/components/AWSService/OptionFactory/Options/S3Option';
import { ROUTE53Option } from '@/src/components/AWSService/OptionFactory/Options/ROUTE53Option';
import { WAFOption } from '@/src/components/AWSService/OptionFactory/Options/WAFOption';
import { ElastiCacheOption } from '@/src/components/AWSService/OptionFactory/Options/ElastiCacheOption';
import { EFSOption } from '@/src/components/AWSService/OptionFactory/Options/EFSOption';
import { CloudFrontOption } from '@/src/components/AWSService/OptionFactory/Options/CloudFrontOption';
import { NATOption } from '@/src/components/AWSService/OptionFactory/Options/NATOption';
import { ELBOption } from '@/src/components/AWSService/OptionFactory/Options/ELBOption';
import { AutoScalingOption } from '@/src/components/AWSService/OptionFactory/Options/AutoScalingOption';
import { ServiceOptions, ServicesString } from '@/src/types/Services';

interface IFactory {
  createOption: (type: ServicesString, id: string) => ServiceOptions;
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
      case 'AutoScaling':
        return AutoScalingOption(id);
    }
  }
}
