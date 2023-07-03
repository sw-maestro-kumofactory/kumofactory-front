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
  lineContainerLocation: {
    x: -1,
    y: -1,
  },
  ServiceAction: {
    onMouseDownService: (event, service) => {
      set((state) => {
        if (service) {
          const newInterval = {
            x: event.clientX - service.x,
            y: event.clientY - service.y,
          };
          return {
            draggable: true,
            selectedArea: null,
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
    setResizable: (flag: boolean, dir: number) => {
      set((state) => {
        state.resizable = {
          isResizable: flag,
          dir: dir,
        };
      });
    },
    createArea: (area: IArea) =>
      // @ts-ignore
      set((state) => {
        state.selectedService = null;
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
          console.log(area);
          return {
            draggable: true,
            selectedService: null,
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
    setArea: (id, width, height) =>
      set((state) => {
        state.areas[id].width = width;
        state.areas[id].height = height;
      }),
  },
});

export const useCommonSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  CommonState
> = (set, get) => ({
  interval: {
    x: 0,
    y: 0,
  },
  gridSrc: {
    x: 0,
    y: 0,
  },
  draggable: false,
  isMoving: false,
  resizable: {
    isResizable: false,
    dir: -1,
  },
  CommonAction: {
    setGridSrc: (x, y) =>
      set(() => ({
        gridSrc: {
          x: x,
          y: y,
        },
      })),
    onClickGrid: (e) => {
      set(() => ({
        selectedService: null,
        selectedArea: null,
        resizable: {
          isResizable: false,
          dir: -1,
        },
        draggable: false,
      }));
    },
    onMouseUp: (e) => {
      set((state) => {
        state.draggable = false;
        state.isMoving = false;
        state.resizable.isResizable = false;
        state.resizable.dir = -1;
      });
    },
    onMouseMove: (event) => {
      set((state) => {
        if (state.resizable.isResizable && state.selectedArea) {
          state.isMoving = true;
          if (state.resizable.dir === 1) {
            const newWidth = event.clientX - state.gridSrc.x - state.selectedArea.sx;
            if (newWidth > 0) state.areas[state.selectedArea.id].width = newWidth;
          } else if (state.resizable.dir === 2) {
            const diff = state.selectedArea.sx - event.clientX + state.gridSrc.x;
            const newWidth = state.selectedArea.width + diff;
            const newSx = event.clientX - state.gridSrc.x;
            if (newWidth > 0) {
              state.areas[state.selectedArea.id].width = newWidth;
              state.areas[state.selectedArea.id].sx = newSx;
            }
          } else if (state.resizable.dir === 3) {
            const newHeight = event.clientY - state.gridSrc.y - state.selectedArea.sy;
            if (newHeight > 0) state.areas[state.selectedArea.id].height = newHeight;
          } else if (state.resizable.dir === 4) {
            const diff = state.selectedArea.sy - event.clientY + state.gridSrc.y;
            const newHeight = state.selectedArea.height + diff;
            const newSy = event.clientY - state.gridSrc.y;
            if (newHeight > 0) {
              state.areas[state.selectedArea.id].height = newHeight;
              state.areas[state.selectedArea.id].sy = newSy;
            }
          }
        } else if (state.draggable) {
          state.isMoving = true;
          const newX = Math.round((event.clientX - state.interval.x) / 22.5) * 22.5;
          const newY = Math.round((event.clientY - state.interval.y) / 22.5) * 22.5;
          if (state.selectedService) {
            state.services[state.selectedService.id].x = newX;
            state.services[state.selectedService.id].y = newY;
            state.lineContainerLocation.x = newX + state.gridSrc.x + 100;
            state.lineContainerLocation.y = newY + state.gridSrc.y - 10;
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
