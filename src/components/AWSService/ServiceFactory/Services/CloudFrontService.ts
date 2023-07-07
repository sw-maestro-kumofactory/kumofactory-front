import { CloudFront } from '@/src/types/Services';

export const CloudFrontService = (): CloudFront => {
  return {
    id: '0',
    x: 0,
    y: 0,
    type: 'CloudFront',
    lines: [],
    options: {},
  };
};
