import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { AreaState } from '@/src/hooks/Store/blueprint/state/AreaState';
import { CommonState } from '@/src/hooks/Store/blueprint/state/CommonState';
import { ServiceState } from '@/src/hooks/Store/blueprint/state/ServiceState';
import { LineState } from '@/src/hooks/Store/blueprint/state/LineState';
import { useServiceSlice } from '@/src/hooks/Store/blueprint/slices/ServiceSlice';
import { useLineSlice } from '@/src/hooks/Store/blueprint/slices/LineSlice';
import { useAreaSlice } from '@/src/hooks/Store/blueprint/slices/AreaSlice';
import { useCommonSlice } from '@/src/hooks/Store/blueprint/slices/CommonSlice';
import { OptionState } from '@/src/hooks/Store/blueprint/state/OptionState';
import { useOptionSlice } from '@/src/hooks/Store/blueprint/slices/OptionSlice';

export type AllBluePrintStates = AreaState & CommonState & ServiceState & LineState & OptionState;

const useBlueprintStore = create<AllBluePrintStates>()(
  devtools(
    immer((...a) => ({
      ...useServiceSlice(...a),
      ...useAreaSlice(...a),
      ...useLineSlice(...a),
      ...useCommonSlice(...a),
      ...useOptionSlice(...a),
    })),
  ),
);

export default useBlueprintStore;
