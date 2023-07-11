import { StateCreator } from 'zustand';
import { v1 } from 'uuid';

import { AreaState } from '@/src/hooks/Store/blueprint/state/AreaState';
import { CommonState } from '@/src/hooks/Store/blueprint/state/CommonState';
import { ServiceState } from '@/src/hooks/Store/blueprint/state/ServiceState';
import { LineState } from '@/src/hooks/Store/blueprint/state/LineState';
import { IArea } from '@/src/types/Area';
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
          const newInterval = {
            x: e.clientX - service.x * state.scale,
            y: e.clientY - service.y * state.scale,
          };
          const tmpSelectedServiceId = state.selectedServiceId;
          state.draggable = true;
          state.selectedAreaId = null;
          state.selectedServiceId = service.id;
          state.interval = newInterval;
          state.lineDrawingLocation = {
            x: service.x * state.scale + state.gridSrc.x + 100 * state.scale,
            y: service.y * state.scale + state.gridSrc.y,
          };
          if (state.lineDrawingMode) {
            const id = v1().toString();

            state.lines[id] = {
              id: id,
              srcId: state.srcPoint,
              dstId: state.dstPoint,
            };

            // service들을 연결할때 처리하는 부분
            if (tmpSelectedServiceId) {
              if (state.linkedServiceId) {
                state.services[state.linkedServiceId].lines.push(id);
                state.services[state.linkedServiceId].linkedPoints.push(state.dstPoint);
              }
              state.services[tmpSelectedServiceId].lines.push(id);
              state.services[tmpSelectedServiceId].linkedPoints.push(state.srcPoint);
              // 새로운 점 만들기
              const tmpXY = state.circles[state.srcPoint];
              state.srcPoint = v1().toString();
              state.dstPoint = v1().toString();
              state.circles[state.srcPoint] = {
                x: tmpXY.x,
                y: tmpXY.y,
                id: state.srcPoint,
              };
              state.circles[state.dstPoint] = {
                x: tmpXY.x,
                y: tmpXY.y,
                id: state.dstPoint,
              };
            } else {
              state.srcPoint = state.dstPoint;
              const newDstId = v1().toString();
              state.dstPoint = newDstId;
              state.circles[newDstId] = {
                x: state.circles[state.srcPoint].x,
                y: state.circles[state.srcPoint].y,
                id: newDstId,
              };
            }
          }
        }
        return state;
      });
    },
    createService: (service) =>
      set((state) => {
        const id = v1().toString();
        state.services[id] = {
          ...service,
          id,
        };
        return state;
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
  linkedServiceId: undefined,
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
          if (!state.linkedServiceId && state.selectedServiceId) {
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
  selectedAreaId: null,
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
    onMouseDownArea: (e, area) => {
      set((state) => {
        if (area) {
          const newInterval = {
            x: e.clientX - area.sx * state.scale,
            y: e.clientY - area.sy * state.scale,
          };
          state.draggable = true;
          state.selectedServiceId = null;
          state.selectedAreaId = area.id;
          state.interval = newInterval;
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
  blueprintSrc: {
    x: 0,
    y: 0,
  },
  draggable: false,
  isMoving: false,
  viewBox: {
    width: 0,
    height: 0,
  },
  scale: 1,
  oneByFourPoint: 20,
  stdScale: null,
  CommonAction: {
    setStdScale: () =>
      set((state) => {
        const background = document.querySelector('#background')!.getBoundingClientRect();
        const tmpStdScale = 1080 / background.width;
        state.scale = state.scale / tmpStdScale;
        state.stdScale = tmpStdScale;
        return state;
      }),
    setViewBox: (width, height) =>
      set((state) => {
        state.viewBox.width = width;
        state.viewBox.height = height;
        return state;
      }),
    setGridSrc: () =>
      set((state) => {
        const gridComponent = document.querySelector('#background')!.getBoundingClientRect();
        state.gridSrc.x = gridComponent.x;
        state.gridSrc.y = gridComponent.y;
        return state;
      }),
    setBlueprintSrc: (x, y) =>
      set(() => ({
        blueprintSrc: {
          x: x,
          y: y,
        },
      })),
    setScale: (scale: number) =>
      set((state) => {
        if (state.stdScale) {
          const s = scale / state.stdScale;
          state.scale = s;
          state.oneByFourPoint = (90 * s) / 4;
        }
        return state;
      }),
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
            state.services[state.selectedServiceId].linkedPoints.push(state.srcPoint);
          }

          state.srcPoint = state.dstPoint;
          const newDstId = v1().toString();
          state.dstPoint = newDstId;
          state.circles[newDstId] = {
            x: state.circles[state.srcPoint].x,
            y: state.circles[state.srcPoint].y,
            id: newDstId,
          };
        }
        state.selectedServiceId = null;
        state.selectedAreaId = null;
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
        if (state.selectedServiceId) {
          //TODO re set line drawing location
          state.lineDrawingLocation = {
            x: state.services[state.selectedServiceId].x * state.scale + state.gridSrc.x + 100 * state.scale,
            y: state.services[state.selectedServiceId].y * state.scale + state.gridSrc.y,
          };
        }
        return state;
      });
    },
    onMouseMove: (e) => {
      set((state) => {
        const gridMouseX = (e.clientX - state.gridSrc.x) / state.scale;
        const gridMouseY = (e.clientY - state.gridSrc.y) / state.scale;
        if (state.lineDrawingMode) {
          if (state.selectedServiceId) {
            const service = state.services[state.selectedServiceId];
            const sx = gridMouseX - service.x - 40 * state.scale;
            const sy = gridMouseY - service.y - 40 * state.scale;
            const currentX = service.x + 40;
            const currentY = service.y + 40;
            const { x, y } = getQuadrant(sx, sy, currentX, currentY);
            state.circles[state.srcPoint].x = x;
            state.circles[state.srcPoint].y = y;

            if (state.linkedServiceId) {
              const linkedService = state.services[state.linkedServiceId];
              const cx = service.x - linkedService.x + 40;
              const cy = service.y - linkedService.y + 40;
              const { x, y } = getQuadrant(cx, cy, linkedService.x + 40, linkedService.y + 40);
              state.circles[state.dstPoint].x = x;
              state.circles[state.dstPoint].y = y;
            } else {
              state.circles[state.dstPoint].x = gridMouseX;
              state.circles[state.dstPoint].y = gridMouseY;
            }
          } else {
            state.circles[state.dstPoint].x = gridMouseX;
            state.circles[state.dstPoint].y = gridMouseY;
          }
        }

        if (state.resizable.isResizable && state.selectedAreaId) {
          const area = state.areas[state.selectedAreaId];
          const calculatedSX = area.sx * state.scale;
          const calculatedSY = area.sy * state.scale;
          state.isMoving = true;

          if (state.resizable.dir === 1) {
            // 동
            const newWidth = (e.clientX - state.gridSrc.x - calculatedSX) / state.scale;
            if (newWidth > 0) state.areas[state.selectedAreaId].width = newWidth;
          } else if (state.resizable.dir === 2) {
            // 서
            const diff = (calculatedSX - e.clientX + state.gridSrc.x) / state.scale;
            const newWidth = area.width + diff;
            const newSx = (e.clientX - state.gridSrc.x) / state.scale;
            if (newWidth > 0) {
              state.areas[state.selectedAreaId].width = newWidth;
              state.areas[state.selectedAreaId].sx = newSx;
            }
          } else if (state.resizable.dir === 3) {
            // 남
            const newHeight = (e.clientY - state.gridSrc.y - calculatedSY) / state.scale;
            if (newHeight > 0) state.areas[state.selectedAreaId].height = newHeight;
          } else if (state.resizable.dir === 4) {
            // 북
            const diff = (calculatedSY - e.clientY + state.gridSrc.y) / state.scale;
            const newHeight = area.height + diff;
            const newSy = (e.clientY - state.gridSrc.y) / state.scale;
            if (newHeight > 0) {
              state.areas[state.selectedAreaId].height = newHeight;
              state.areas[state.selectedAreaId].sy = newSy;
            }
          }
        } else if (state.draggable) {
          state.isMoving = true;
          const newX = Math.round((e.clientX - state.interval.x) / state.scale / 20) * 20;
          const newY = Math.round((e.clientY - state.interval.y) / state.scale / 20) * 20;

          if (state.selectedServiceId) {
            const service = state.services[state.selectedServiceId];
            state.services[state.selectedServiceId].lines.forEach((line) => {
              // TODO: Update this logic
              const src = state.lines[line].srcId;
              const dst = state.lines[line].dstId;
              if (service.linkedPoints.includes(src)) {
                const cx = state.circles[dst].x - service.x - 40;
                const cy = state.circles[dst].y - service.y - 40;
                const { x, y } = getQuadrant(cx, cy, newX + 40, newY + 40);
                state.circles[src].x = x;
                state.circles[src].y = y;
              } else if (service.linkedPoints.includes(dst)) {
                // TODO
                const standardX = service.x;
                const standardY = service.y;
                const cx = state.circles[src].x - service.x + 40;
                const cy = state.circles[src].y - service.y + 40;
                const { x, y } = getQuadrant(cx, cy, standardX + 40, standardY + 40);
                state.circles[dst].x = x;
                state.circles[dst].y = y;
              }
            });
            service.x = newX;
            service.y = newY;
          } else if (state.selectedAreaId) {
            state.areas[state.selectedAreaId].sx = newX;
            state.areas[state.selectedAreaId].sy = newY;
          }
        }

        return state;
      });
    },
    clearComponent: () => {
      set((state) => {
        if (state.selectedServiceId) {
          //   selectedService 제거
          state.services = Object.fromEntries(
            Object.entries(state.services).filter(([key, value]) => key !== state.selectedServiceId),
          );
        } else if (state.selectedAreaId) {
          //   selectedArea 제거
          state.areas = Object.fromEntries(
            Object.entries(state.areas).filter(([key, value]) => key !== state.selectedAreaId),
          );
        }
        // else if(state.selectedLineId) {

        // 모든 상태 null
        state.selectedServiceId = null;
        state.selectedAreaId = null;
        state.isMoving = false;
        state.lineDrawingMode = false;
        state.linkedServiceId = undefined;
        return state;
      });
    },
  },
});
