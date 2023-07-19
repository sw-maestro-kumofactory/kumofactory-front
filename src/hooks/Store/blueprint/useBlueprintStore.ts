import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import {
  useServiceSlice,
  useAreaSlice,
  useCommonSlice,
  AllBluePrintStates,
  useLineSlice,
} from '@/src/hooks/Store/blueprint/Slices';

const useBlueprintStore = create<AllBluePrintStates>()(
  devtools(
    immer((...a) => ({
      ...useServiceSlice(...a),
      ...useAreaSlice(...a),
      ...useLineSlice(...a),
      ...useCommonSlice(...a),
    })),
  ),
);

export default useBlueprintStore;
