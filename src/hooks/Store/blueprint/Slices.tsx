import { StateCreator } from 'zustand';
import { v1 } from 'uuid';
import { namedTypes } from 'ast-types';

import { AreaState } from '@/src/hooks/Store/blueprint/state/AreaState';
import { CommonState } from '@/src/hooks/Store/blueprint/state/CommonState';
import { ServiceState } from '@/src/hooks/Store/blueprint/state/ServiceState';
import { LineState } from '@/src/hooks/Store/blueprint/state/LineState';
import { IArea } from '@/src/types/Area';
import { Point } from '@/src/types/Common';
import { getQuadrant } from '@/src/utils/getQuadrant';

import Line = namedTypes.Line;

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
          if (state.lineDrawingMode) {
            if (state.linkedServiceId && state.curLineId) {
              state.lines[state.curLineId].dst.componentId = state.linkedServiceId;
              state.services[state.linkedServiceId].lines.push(state.curLineId);
              state.services[state.lines[state.curLineId].src.componentId].lines.push(state.curLineId);
            }
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
  curLineId: undefined,
  linkedServiceId: undefined,
  LineAction: {
    // flag === true => lineDrawing mode on
    // flag === false => lineDrawing mode off
    setLineDrawingMode: (flag: boolean) =>
      set((state) => {
        if (flag && state.selectedServiceId) {
          state.lineDrawingMode = true;
          const lineId = v1().toString();
          state.lines[lineId] = {
            id: lineId,
            src: {
              x: state.services[state.selectedServiceId].x + 40,
              y: state.services[state.selectedServiceId].y + 40,
              componentId: state.selectedServiceId,
            },
            dst: {
              x: state.services[state.selectedServiceId].x + 40,
              y: state.services[state.selectedServiceId].y + 40,
              componentId: '',
            },
          };
          state.curLineId = lineId;
        } else {
          if (state.curLineId) {
            delete state.lines[state.curLineId];
            state.curLineId = undefined;
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
        if (state.lineDrawingMode && state.curLineId) {
          if (state.linkedServiceId) {
            const service = state.services[state.lines[state.curLineId].src.componentId];
            // legacy
            const linkedService = state.services[state.linkedServiceId];
            const cx = service.x - linkedService.x + 40;
            const cy = service.y - linkedService.y + 40;
            const { x, y } = getQuadrant(cx, cy, linkedService.x + 40, linkedService.y + 40);
            state.lines[state.curLineId].dst.x = x;
            state.lines[state.curLineId].dst.y = y;
          } else {
            state.lines[state.curLineId].dst.x = gridMouseX;
            state.lines[state.curLineId].dst.y = gridMouseY;
          }
          // src의 좌표 움직이기
          const service = state.services[state.lines[state.curLineId].src.componentId];
          const cx = gridMouseX - service.x + 40;
          const cy = gridMouseY - service.y + 40;
          const { x, y } = getQuadrant(cx, cy, service.x + 40, service.y + 40);
          state.lines[state.curLineId].src.x = x;
          state.lines[state.curLineId].src.y = y;
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
              const srcService = state.services[state.lines[line].src.componentId];
              const dstService = state.services[state.lines[line].dst.componentId];
              const src = state.lines[line].src;
              const dst = state.lines[line].dst;

              // 연결된 선 둘 다 처리하자.
              // 1. src
              const srcSx = dstService.x - srcService.x;
              const srcSy = dstService.y - srcService.y;
              const { x: srcX, y: srcY } = getQuadrant(srcSx, srcSy, srcService.x + 40, srcService.y + 40);
              src.x = srcX;
              src.y = srcY;
              // 2. dst
              const dstSx = srcService.x - dstService.x;
              const dstSy = srcService.y - dstService.y;
              const { x: dstX, y: dstY } = getQuadrant(dstSx, dstSy, dstService.x + 40, dstService.y + 40);
              dst.x = dstX;
              dst.y = dstY;
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
        // TODO line 선택, 제거할 수 있도록
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
