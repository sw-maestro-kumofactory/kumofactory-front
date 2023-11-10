import { EFSOptions } from '@/src/types/Services';

export const EFSOption = (id: string): EFSOptions => {
  return { id: id };
};

export const EFSOptionComponent = ({ id }: { id: string }) => {
  return <>EFSOptionComponent</>;
};
