import { StateCreator } from 'zustand';
import { v1 } from 'uuid';

import { AreaState } from '@/src/hooks/Store/blueprint/state/AreaState';
import { IArea } from '@/src/types/Area';
import { AllBluePrintStates } from '@/src/hooks/Store/blueprint/useBlueprintStore';

export const useAreaSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  AreaState
> = (set, get) => ({
  areas: {},
  selectedAreaId: null,
  resizeState: {
    isResizable: false,
    dir: -1,
  },
  AreaAction: {
    setResizable: (flag: boolean, dir: number) => {
      set((state) => {
        state.resizeState = {
          isResizable: flag,
          dir: dir,
        };
        return state;
      });
    },
    createArea: (area: IArea) =>
      set((state) => {
        state.selectedServiceId = null;
        const id = v1().toString();
        state.areas[id] = {
          ...area,
          id: id,
        };
        return state;
      }),
    onMouseDownArea: (e, area) => {
      set((state) => {
        if (area) {
          const newOffset = {
            x: (e.clientX - state.blueprintElementPosition.x) * state.scale - area.x + state.viewBox.x,
            y: (e.clientY - state.blueprintElementPosition.y) * state.scale - area.y + state.viewBox.y,
          };
          state.isShowOption = false;
          state.doubleClickedServiceId = null;
          state.isDrag = true;
          state.selectedServiceId = null;
          state.selectedAreaId = area.id;
          state.offset = newOffset;
        } else {
          state.selectedAreaId = null;
        }
        return state;
      });
    },
    setArea: (id, width, height) =>
      set((state) => {
        state.areas[id].width = width;
        state.areas[id].height = height;
        return state;
      }),
  },
});
