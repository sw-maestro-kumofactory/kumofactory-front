import { StateCreator } from 'zustand';
import { v1 } from 'uuid';

import { AreaState } from '@/src/hooks/Store/blueprint/state/AreaState';
import { AreaTypes, IArea } from '@/src/types/Area';
import { AllBluePrintStates } from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { AccessScope, AvailabilityZone, AvailabilityZoneList } from '@/src/types/Services';

export const useAreaSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  AreaState
> = (set, get) => ({
  areas: {},
  selectedAreaId: null,
  azCount: {
    '2a': 0,
    '2c': 0,
  },
  subnetCount: {
    public: 0,
    private: 0,
    database: 0,
  },
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
        if (type === 'ap-northeast-2a') {
          state.azCount['2a'] += 1;
        } else if (type === 'ap-northeast-2c') {
          state.azCount['2c'] += 1;
        } else if (type === 'Public') {
          state.subnetCount.public += 1;
        } else if (type === 'Private') {
          state.subnetCount.private += 1;
        } else if (type === 'Database') {
          state.subnetCount.database += 1;
        }
        const id = v1().toString();
        state.areas[id] = {
          ...area,
          id: id,
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
        state.areas[id].width = width;
        state.areas[id].height = height;
        return state;
      }),
  },
});
