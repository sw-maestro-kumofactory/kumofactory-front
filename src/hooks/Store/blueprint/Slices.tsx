import { AreaState } from '@/src/hooks/Store/blueprint/state/AreaState';
import { CommonState } from '@/src/hooks/Store/blueprint/state/CommonState';
import { ServiceState } from '@/src/hooks/Store/blueprint/state/ServiceState';
import { LineState } from '@/src/hooks/Store/blueprint/state/LineState';
import { StateCreator } from 'zustand';
import { IArea } from '@/src/types/Area';
import { v1 } from 'uuid';
import { Point } from '@/src/types/Common';
import { getQuadrant } from '@/src/utils/getQuadrant';
export type AllBluePrintStates = AreaState & CommonState & ServiceState & LineState;

export const useServiceSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  ServiceState
> = (set, get) => ({
  services: {},
  selectedServiceId: null,
  lineDrawingMode: false,
  ServiceAction: {
    onMouseEnterService: (event, service) => {
      set((state) => {
        if (state.lineDrawingMode) {
          console.log('lineDrawingMode');
        }
        return state;
      });
    },
    onMouseDownService: (event, service) => {
      set((state) => {
        if (service) {
          const newInterval = {
            x: event.clientX - service.x,
            y: event.clientY - service.y,
          };
          state.draggable = true;
          state.selectedArea = null;
          state.selectedServiceId = service.id;
          state.interval = newInterval;
        }
        return state;
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

export const useLineSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  LineState
> = (set, get) => ({
  lines: {},
  srcPoint: '',
  dstPoint: '',
  LineAction: {
    setLineDrawingMode: (flag: boolean) =>
      set((state) => {
        if (flag) {
          state.lineDrawingMode = true;
          const srcId = v1().toString();
          const dstId = v1().toString();
          state.srcPoint = srcId;
          state.dstPoint = dstId;
          state.circles[srcId] = {
            x: 0,
            y: 0,
            id: srcId,
          };
          state.circles[dstId] = {
            x: 0,
            y: 0,
            id: dstId,
          };
        } else {
          if (state.selectedServiceId) {
            state.circles = Object.keys(state.circles).reduce((acc: Record<string, Point>, key) => {
              if (key !== state.dstPoint && key !== state.srcPoint) {
                acc[key] = state.circles[key];
              }
              return acc;
            }, {});
          } else {
            state.circles = Object.keys(state.circles).reduce((acc: Record<string, Point>, key) => {
              if (key !== state.dstPoint) {
                acc[key] = state.circles[key];
              }
              return acc;
            }, {});
          }
          state.lineDrawingMode = false;
          state.srcPoint = '';
          state.dstPoint = '';
        }
        return state;
      }),
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
  resizable: {
    isResizable: false,
    dir: -1,
  },
  AreaAction: {
    setResizable: (flag: boolean, dir: number) => {
      set((state) => {
        state.resizable = {
          isResizable: flag,
          dir: dir,
        };
        return state;
      });
    },
    createArea: (area: IArea) =>
      // @ts-ignore
      set((state) => {
        state.selectedServiceId = null;
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
          state.draggable = true;
          state.selectedServiceId = null;
          state.selectedArea = area;
          state.interval = newInterval;
        } else {
          state.selectedArea = null;
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

export const useCommonSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  CommonState
> = (set, get) => ({
  circles: {},
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
  CommonAction: {
    setGridSrc: (x, y) =>
      set(() => ({
        gridSrc: {
          x: x,
          y: y,
        },
      })),
    onClickGrid: (e) => {
      set((state) => {
        if (state.lineDrawingMode) {
          const id = v1().toString();

          state.lines[id] = {
            id: id,
            srcId: state.srcPoint,
            dstId: state.dstPoint,
          };

          if (state.selectedServiceId) {
            state.services[state.selectedServiceId].lines.push(id);
          }

          state.srcPoint = state.dstPoint;
          const newDstId = v1().toString();
          state.dstPoint = newDstId;
          state.circles[newDstId] = {
            x: 0,
            y: 0,
            id: newDstId,
          };
        }
        state.selectedServiceId = null;
        state.selectedArea = null;
        state.resizable = {
          isResizable: false,
          dir: -1,
        };
        state.draggable = false;
        return state;
      });
    },
    onMouseUp: (e) => {
      set((state) => {
        state.draggable = false;
        state.isMoving = false;
        state.resizable.isResizable = false;
        state.resizable.dir = -1;
        return state;
        // selectedService 상태 업데이트하기
      });
    },
    onMouseMove: (event) => {
      set((state) => {
        if (state.lineDrawingMode) {
          if (state.selectedServiceId) {
            const sx = event.clientX - state.gridSrc.x - state.services[state.selectedServiceId].x - 45;
            const sy = event.clientY - state.gridSrc.y - state.services[state.selectedServiceId].y - 45;
            const currentX = state.services[state.selectedServiceId].x;
            const currentY = state.services[state.selectedServiceId].y;
            const { x, y } = getQuadrant(sx, sy, currentX, currentY);
            state.circles[state.srcPoint].x = x;
            state.circles[state.srcPoint].y = y;
          }
          state.circles[state.dstPoint].x = event.clientX - state.gridSrc.x;
          state.circles[state.dstPoint].y = event.clientY - state.gridSrc.y;
        }

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
          if (state.selectedServiceId) {
            const currentX = state.services[state.selectedServiceId].x;
            const currentY = state.services[state.selectedServiceId].y;
            state.services[state.selectedServiceId].lines.map((line) => {
              const src = state.lines[line].srcId;
              const dst = state.lines[line].dstId;
              const cx = state.circles[dst].x - currentX;
              const cy = state.circles[dst].y - currentY;
              const { x, y } = getQuadrant(cx, cy, newX, newY);
              state.circles[src].x = x;
              state.circles[src].y = y;
            });
            state.services[state.selectedServiceId].x = newX;
            state.services[state.selectedServiceId].y = newY;
          } else if (state.selectedArea) {
            state.areas[state.selectedArea.id].sx = newX;
            state.areas[state.selectedArea.id].sy = newY;
          }
        }
        return state;
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
