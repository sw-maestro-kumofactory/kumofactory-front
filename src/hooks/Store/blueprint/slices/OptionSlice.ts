import { StateCreator } from 'zustand';
import { v1 } from 'uuid';

import { AreaState } from '@/src/hooks/Store/blueprint/state/AreaState';
import { IArea } from '@/src/types/Area';
import { AllBluePrintStates } from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { OptionState } from '@/src/hooks/Store/blueprint/state/OptionState';

export const useOptionSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  OptionState
> = (set, get) => ({
  options: {},
  OptionAction: {
    createOption: (option) =>
      set((state) => {
        state.options[option.id] = option;
        return state;
      }),
  },
});
