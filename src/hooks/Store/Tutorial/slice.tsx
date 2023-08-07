import { StateCreator } from 'zustand';

import { TutorialState } from '@/src/hooks/Store/Tutorial/state';

export const useTutorialSlice: StateCreator<
  TutorialState,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  TutorialState
> = (set, get) => ({
  isDone: false,
  tutorialNumber: 0,
  tutorialAction: {
    decreaseNumber: () => {
      set((state) => {
        if (state.tutorialNumber !== 0) {
          state.tutorialNumber -= 1;
        }
        return state;
      });
    },
    increaseNumber: () => {
      set((state) => ({ ...state, tutorialNumber: state.tutorialNumber + 1 }));
    },
    setIsDone: () => {
      set((state) => ({ ...state, isDone: true }));
    },
  },
});
