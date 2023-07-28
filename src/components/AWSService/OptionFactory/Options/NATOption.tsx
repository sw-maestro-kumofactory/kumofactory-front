import { NATOptions } from '@/src/types/Services';

export const NATOption = (id: string): NATOptions => {
  return { id: id };
};

export const NATOptionComponent = ({ id }: { id: string }) => {
  return <>NATOptionComponent</>;
};
