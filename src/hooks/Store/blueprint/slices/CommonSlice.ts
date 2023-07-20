import { StateCreator } from 'zustand';
import { v1 } from 'uuid';

import { CommonState } from '@/src/hooks/Store/blueprint/state/CommonState';
import { BlueprintResponse } from '@/src/types/Blueprint';
import { getQuadrant } from '@/src/utils/getQuadrant';
import { AllBluePrintStates } from '@/src/hooks/Store/blueprint/useBlueprintStore';

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
  name: 'My blueprint',
  oneByFourPoint: 20,
  stdScale: null,
  isEdit: false,
  CommonAction: {
    initState: () => {
      set((state) => {
        state.services = {};
        state.lines = {};
        state.areas = {};
        return state;
      });
    },
    setName: (name: string) => {
      set((state) => {
        state.name = name;
        return state;
      });
    },
    setIsEdit: (flag: boolean) => {
      set((state) => {
        state.isEdit = flag;
        return state;
      });
    },
    blueprintToJson: () => {
      const json: BlueprintResponse = {
        name: '',
        components: [],
        links: [],
      };
      json['name'] = v1().toString();
      json['components'] = [];
      for (const service of Object.values(get().services)) {
        json['components'].push({
          id: service.id,
          x: service.x,
          y: service.y,
          type: service.type,
        });
      }
      json['links'] = [];
      for (const line of Object.values(get().lines)) {
        json['links'].push({
          id: line.id,
          src: {
            x: line.src.x,
            y: line.src.y,
            componentId: line.src.componentId,
          },
          dst: {
            x: line.dst.x,
            y: line.dst.y,
            componentId: line.dst.componentId,
          },
        });
      }
      return json;
    },
    setStdScale: () =>
      set((state) => {
        const background = document.querySelector('#background')!.getBoundingClientRect();
        const tmpStdScale = 1040 / background.width;
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
        state.selectedLineId = null;
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
          const cx = gridMouseX - service.x - 40;
          const cy = gridMouseY - service.y - 40;
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

            //선택된 선 처리
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
          const currentService = state.services[state.selectedServiceId];
          delete state.services[state.selectedServiceId];
          for (const line of currentService.lines) {
            const removedLine = state.lines[line];
            if (removedLine.src.componentId === state.selectedServiceId) {
              const dstService = state.services[removedLine.dst.componentId];
              dstService.lines = dstService.lines.filter((l) => l !== line);
            } else {
              const srcService = state.services[removedLine.src.componentId];
              srcService.lines = srcService.lines.filter((l) => l !== line);
            }
            delete state.lines[line];
          }
        } else if (state.selectedAreaId) {
          //   selectedArea 제거
          delete state.areas[state.selectedAreaId];
        } else if (state.selectedLineId) {
          //   selectedLine 제거
          const line = state.lines[state.selectedLineId];
          const srcService = state.services[line.src.componentId];
          const dstService = state.services[line.dst.componentId];
          srcService.lines = srcService.lines.filter((l) => l !== state.selectedLineId);
          dstService.lines = dstService.lines.filter((l) => l !== state.selectedLineId);
          delete state.lines[state.selectedLineId];
        }

        // 모든 상태 null
        state.selectedServiceId = null;
        state.selectedAreaId = null;
        state.isMoving = false;
        state.lineDrawingMode = false;
        state.linkedServiceId = undefined;
        state.selectedLineId = null;
        return state;
      });
    },
  },
});