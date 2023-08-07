import { DeployState } from '@/src/types/Deploy';

export const StatusStyle: Record<DeployState, { fill: string; phrase: string }> = {
  Provisioning: {
    fill: '#FF9900',
    phrase: 'Provisioning',
  },
  Pending: {
    fill: '#D9D9D9',
    phrase: 'Pending',
  },
  Success: {
    fill: '#6CAE3E',
    phrase: 'Success',
  },
  Fail: {
    fill: '#D3372A',
    phrase: 'Fail',
  },
};
