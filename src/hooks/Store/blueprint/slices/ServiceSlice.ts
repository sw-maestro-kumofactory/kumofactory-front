import { StateCreator } from 'zustand';

import { ServiceState } from '@/src/hooks/Store/blueprint/state/ServiceState';
import { AllBluePrintStates } from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { IComponent, ServiceOptions, ServicesString } from '@/src/types/Services';

export const useServiceSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  ServiceState
> = (set, get) => ({
  services: {},
  selectedServiceId: null,
  isLineDrawing: false,
  lineDrawingLocation: {
    x: 0,
    y: 0,
  },
  doubleClickedServiceId: null,
  ServiceAction: {
    onMouseEnterService: (event, service) => {
      set((state) => {
        if (state.isLineDrawing) {
          state.linkedServiceId = service!.id;
        }
        return state;
      });
    },
    onMouseLeaveService: (e, service) => {
      set((state) => {
        if (state.isLineDrawing) {
          state.linkedServiceId = undefined;
        }
        return state;
      });
    },
    onMouseDownService: (e, service) => {
      set((state) => {
        if (service) {
          if (state.isLineDrawing) {
            if (state.linkedServiceId && state.curLineId) {
              state.lines[state.currentBlueprintInfo.uuid][state.curLineId].dst.componentId = state.linkedServiceId;
              state.services[state.currentBlueprintInfo.uuid][state.linkedServiceId].lines.push(state.curLineId);
              state.services[state.currentBlueprintInfo.uuid][
                state.lines[state.currentBlueprintInfo.uuid][state.curLineId].src.componentId
              ].lines.push(state.curLineId);
            }
            state.curLineId = undefined;
          }
          const newOffset = {
            x: (e.clientX - state.blueprintElementPosition.x) * state.scale - service.x + state.viewBox.x,
            y: (e.clientY - state.blueprintElementPosition.y) * state.scale - service.y + state.viewBox.y,
          };
          state.isDrag = true;
          state.selectedAreaId = null;
          state.selectedServiceId = service.id;
          state.offset = newOffset;
          state.lineDrawingLocation = {
            x: service.x * state.scale + state.gridSrc.x + 100 * state.scale,
            y: service.y * state.scale + state.gridSrc.y,
          };
          state.doubleClickedServiceId = null;
          state.isShowOption = false;
          state.linkedServiceId = undefined;
          state.isLineDrawing = false;
        }
        return state;
      });
    },
    onDoubleClickService: (e, service) => {
      set((state) => {
        if (service && e.detail === 2) {
          state.doubleClickedServiceId = service.id;
          state.isShowOption = true;
        }
        return state;
      });
    },
    createService: (service: IComponent, id: string) =>
      set((state) => {
        state.services[state.currentBlueprintInfo.uuid][id] = {
          ...service,
          id,
        };
        return state;
      }),
    setOption: (id: string, options: ServiceOptions) => {
      set((state) => {
        state.options[id] = options;
        return state;
      });
    },
  },
});
