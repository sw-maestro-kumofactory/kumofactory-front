import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { DeployState } from '@/src/hooks/Store/ApplicationDeploy/state/DeployState';
import { useOptionSlice } from '@/src/hooks/Store/ApplicationDeploy/slices/DeploySlice';

const useDeployStore = create<DeployState>()(
  immer((...a) => ({
    ...useOptionSlice(...a),
  })),
);

export default useDeployStore;
