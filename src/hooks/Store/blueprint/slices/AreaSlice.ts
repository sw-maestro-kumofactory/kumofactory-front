import { StateCreator } from 'zustand';

import { AreaState } from '@/src/hooks/Store/blueprint/state/AreaState';
import { AreaTypes, IArea } from '@/src/types/Area';
import { AllBluePrintStates } from '@/src/hooks/Store/blueprint/useBlueprintStore';

export const useAreaSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  AreaState
> = (set, get) => ({
  areas: {},
  selectedAreaId: null,
  azCount: {},
  subnetCount: {},
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
    createArea: (area: IArea, type: AreaTypes) =>
      set((state) => {
        state.selectedServiceId = null;
        state.doubleClickedServiceId = null;
        const currentSubnetCount = state.subnetCount[state.currentBlueprintInfo.uuid];
        const currentAzCount = state.azCount[state.currentBlueprintInfo.uuid];
        if (type === 'AZ') {
          if (area.az === 'AP_NORTHEAST_2A') {
            currentAzCount['2a'] += 1;
          } else if (area.az === 'AP_NORTHEAST_2C') {
            currentAzCount['2c'] += 1;
          }
        } else if (type === 'SUBNET') {
          if (area.scope === 'PUBLIC') {
            currentSubnetCount.public += 1;
          } else if (area.scope === 'PRIVATE') {
            currentSubnetCount.private += 1;
          } else if (area.scope === 'DATABASE') {
            currentSubnetCount.database += 1;
          }
        }
        state.areas[state.currentBlueprintInfo.uuid][area.id] = {
          ...area,
          id: area.id,
          type: type,
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
        state.areas[state.currentBlueprintInfo.uuid][id].width = width;
        state.areas[state.currentBlueprintInfo.uuid][id].height = height;
        return state;
      }),
  },
});
