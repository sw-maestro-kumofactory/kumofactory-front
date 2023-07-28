import { AutoScalingOptions } from '@/src/types/Services';
import { CommonOptions } from '@/src/components/AWSService/OptionFactory/CommonOptions';
export const AutoScalingOption = (id: string): AutoScalingOptions => {
  return {
    id: id,
  };
};

export const AutoScalingOptionComponent = ({ id }: { id: string }) => {
  return <div>AutoScalingOptionComponent</div>;
};
