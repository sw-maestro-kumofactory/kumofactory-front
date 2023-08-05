'use client';
import { SWRConfig } from 'swr';
export const SwrProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>;
};
