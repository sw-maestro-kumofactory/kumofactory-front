import { IComponent } from '@/src/types/Services';

export interface EC2Options {
  instanceType: string; // ex) t2.micro -> type, size로 분류
  machineImage: string; // amazon linux 2023 으로 고정되어 있어서 일단 "" 로 보내면 됨
  subnetType: AccessScope;
  availabilityZone: AvailabilityZone;
  instanceName: string;
  securityGroupType: AccessScope;
  id: string; // instance name id : "TestInstance" 임
}

export enum AccessScope {
  Public,
  Private,
  Database,
}

export enum AvailabilityZone {
  AP_NORTHEAST_2A,
  AP_NORTHEAST_2C,
}

export interface EC2 extends IComponent {
  options: EC2Options;
}
