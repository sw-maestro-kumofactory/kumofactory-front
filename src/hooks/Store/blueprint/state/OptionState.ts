import { ServiceOptions } from '@/src/types/Services';

export interface OptionState {
  options: Record<string, ServiceOptions>;
  OptionAction: {
    createOption: (option: ServiceOptions) => void;
  };
}
