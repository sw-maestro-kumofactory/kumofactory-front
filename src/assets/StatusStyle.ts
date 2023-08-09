import { DeployState } from '@/src/types/Deploy';

export const StatusStyle: Record<DeployState, { fill: string; phrase: string }> = {
  PROVISIONING: {
    fill: '#FF9900',
    phrase: 'Provisioning',
  },
  PENDING: {
    fill: '#D9D9D9',
    phrase: 'Pending',
  },
  SUCCESS: {
    fill: '#6CAE3E',
    phrase: 'Success',
  },
  FAIL: {
    fill: '#D3372A',
    phrase: 'Fail',
  },
};
