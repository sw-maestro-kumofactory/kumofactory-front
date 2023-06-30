import { AreaState } from '@/src/hooks/Store/blueprint/state/AreaState';
import { CommonState } from '@/src/hooks/Store/blueprint/state/CommonState';
import { ServiceState } from '@/src/hooks/Store/blueprint/state/ServiceState';

import { StateCreator } from 'zustand';
import { IArea } from '@/src/types/Area';
import { v1 } from 'uuid';

export type AllBluePrintStates = AreaState & CommonState & ServiceState;

export const useServiceSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  ServiceState
> = (set, get) => ({
  services: {},
  selectedService: null,
  ServiceAction: {
    onMouseDownService: (event, service) => {
      set((state) => {
        if (service) {
          const newInterval = {
            x: event.clientX - service.x,
            y: event.clientY - service.y,
          };
          return {
            isMouseDown: true,
            selectedService: service,
            interval: newInterval,
          };
        }
        return {
          ...state,
          selectedService: null,
        };
      });
    },
    createService: (service) =>
      // @ts-ignore
      set((state) => {
        const id = v1().toString();
        state.services[id] = {
          ...service,
          id,
        };
      }),
    setOptions: (service) => {},
  },
});

export const useAreaSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  AreaState
> = (set, get) => ({
  areas: {},
  selectedArea: null,
  AreaAction: {
    createArea: (area: IArea) =>
      // @ts-ignore
      set((state) => {
        const id = v1().toString();
        state.areas[id] = {
          ...area,
          id: id,
        };
      }),
    onMouseDownArea: (event, area) => {
      set((state) => {
        if (area) {
          const newInterval = {
            x: event.clientX - area.sx,
            y: event.clientY - area.sy,
          };
          return {
            isMouseDown: true,
            selectedArea: area,
            interval: newInterval,
          };
        }
        return {
          ...state,
          selectedArea: null,
        };
      });
    },
    onClickArea: (area: IArea) => set(() => ({ selectedArea: area })),
  },
});

export const useCommonSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  CommonState
> = (set, get) => ({
  isMouseDown: false,
  interval: {
    x: 0,
    y: 0,
  },
  CommonAction: {
    onClickGrid: (e) => {
      set(() => ({
        selectedService: null,
        selectedArea: null,
      }));
    },
    onMouseUp: (e) => {
      set(() => ({ isMouseDown: false }));
    },
    onMouseMove: (event) => {
      set((state) => {
        if (state.isMouseDown) {
          const newX = Math.round((event.clientX - state.interval.x) / 22.5) * 22.5;
          const newY = Math.round((event.clientY - state.interval.y) / 22.5) * 22.5;
          if (state.selectedService) {
            state.services[state.selectedService.id].x = newX;
            state.services[state.selectedService.id].y = newY;
          } else if (state.selectedArea) {
            state.areas[state.selectedArea.id].sx = newX;
            state.areas[state.selectedArea.id].sy = newY;
          }
        }
      });
    },
    clearComponent: () => {
      set(() => ({
        selectedService: null,
        selectedArea: null,
      }));
    },
  },
});
