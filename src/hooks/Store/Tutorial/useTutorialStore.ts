import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { TutorialState } from '@/src/hooks/Store/Tutorial/state';
import { useTutorialSlice } from '@/src/hooks/Store/Tutorial/slice';

const useTutorialStore = create<TutorialState>()(
  devtools(
    immer((...a) => ({
      ...useTutorialSlice(...a),
    })),
  ),
);

export default useTutorialStore;
