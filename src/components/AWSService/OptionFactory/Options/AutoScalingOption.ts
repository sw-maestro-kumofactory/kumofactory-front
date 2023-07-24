import { AutoScalingOptions } from '@/src/types/Services';
import { CommonOptions } from '@/src/components/AWSService/OptionFactory/CommonOptions';
export const AutoScalingOption = (id: string): AutoScalingOptions => {
  return {
    id: id,
  };
};
