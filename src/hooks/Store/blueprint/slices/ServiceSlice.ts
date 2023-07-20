import { StateCreator } from 'zustand';

import { ServiceState } from '@/src/hooks/Store/blueprint/state/ServiceState';
import { Services } from '@/src/types/Services';
import { AllBluePrintStates } from '@/src/hooks/Store/blueprint/useBlueprintStore';

export const useServiceSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  ServiceState
> = (set, get) => ({
  services: {},
  selectedServiceId: null,
  lineDrawingMode: false,
  lineDrawingLocation: {
    x: 0,
    y: 0,
  },
  ServiceAction: {
    onMouseEnterService: (event, service) => {
      set((state) => {
        if (state.lineDrawingMode) {
          state.linkedServiceId = service!.id;
        }
        return state;
      });
    },
    onMouseLeaveService: (e, service) => {
      set((state) => {
        if (state.lineDrawingMode) {
          state.linkedServiceId = undefined;
        }
        return state;
      });
    },
    onMouseDownService: (e, service) => {
      set((state) => {
        if (service) {
          if (state.lineDrawingMode) {
            if (state.linkedServiceId && state.curLineId) {
              state.lines[state.curLineId].dst.componentId = state.linkedServiceId;
              state.services[state.linkedServiceId].lines.push(state.curLineId);
              state.services[state.lines[state.curLineId].src.componentId].lines.push(state.curLineId);
            }
            state.curLineId = undefined;
          }
          const newInterval = {
            x: e.clientX - service.x * state.scale,
            y: e.clientY - service.y * state.scale,
          };
          state.draggable = true;
          state.selectedAreaId = null;
          state.selectedServiceId = service.id;
          state.interval = newInterval;
          state.lineDrawingLocation = {
            x: service.x * state.scale + state.gridSrc.x + 100 * state.scale,
            y: service.y * state.scale + state.gridSrc.y,
          };

          state.linkedServiceId = undefined;
          state.lineDrawingMode = false;
        }
        return state;
      });
    },
    createService: (service: Services, id: string) =>
      set((state) => {
        state.services[id] = {
          ...service,
          id,
        };
        return state;
      }),
    setOptions: (service) => {},
  },
});
