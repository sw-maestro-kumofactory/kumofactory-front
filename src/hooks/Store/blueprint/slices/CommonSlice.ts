import { StateCreator } from 'zustand';
import { v1 } from 'uuid';

import { CommonState } from '@/src/hooks/Store/blueprint/state/CommonState';
import { BlueprintResponse } from '@/src/types/Blueprint';
import { getQuadrant } from '@/src/utils/getQuadrant';
import { AllBluePrintStates } from '@/src/hooks/Store/blueprint/useBlueprintStore';

// 그리드 내에서의 상대 좌표를 얻는다.
const getGirdPoint = (
  e: React.MouseEvent,
  scale: number,
  viewBox: { x: number; y: number; width: number; height: number },
  blueprintSrc: { x: number; y: number },
) => {
  let x = viewBox.x;
  let y = viewBox.y;
  let relativeX = e.clientX - blueprintSrc.x;
  let relativeY = e.clientY - blueprintSrc.y;

  return {
    x: x + relativeX * scale,
    y: y + relativeY * scale,
  };
};

export const useCommonSlice: StateCreator<
  AllBluePrintStates,
  [],
  [['zustand/devtools', never], ['zustand/immer', never]],
  CommonState
> = (set, get) => ({
  name: 'My blueprint',
  offset: {
    x: 0,
    y: 0,
  },
  svgOrigin: {
    x: 0,
    y: 0,
  },
  gridSrc: {
    x: 0,
    y: 0,
  },
  blueprintElementPosition: {
    x: 0,
    y: 0,
  },
  isDrag: false,
  isMoving: false,
  viewBox: {
    x: -150,
    y: -150,
    width: 0,
    height: 0,
  },
  scale: 1,
  quarterPoint: 20,
  isEdit: false,
  viewBoxOriginSize: {
    width: 0,
    height: 0,
  },
  isShowOption: false,
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
        areas: [],
      };
      json['name'] = v1().toString();
      // services
      for (const service of Object.values(get().services)) {
        json['components'].push({
          id: service.id,
          x: service.x,
          y: service.y,
          type: service.type,
        });
      }
      // links
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
      // areas
      // for (const area of Object.values(get().areas)) {
      //   json['areas'].push({
      //     id: area.id,
      //     x: area.x,
      //     y: area.y,
      //     width: area.width,
      //     height: area.height,
      //     type: area.type,
      //   });
      // }
      return json;
    },
    setViewBox: (width, height) =>
      set((state) => {
        state.viewBox.width = width * state.scale;
        state.viewBox.height = height * state.scale;
        state.viewBoxOriginSize.width = width;
        state.viewBoxOriginSize.height = height;
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
        blueprintElementPosition: {
          x: x,
          y: y,
        },
      })),
    onClickGrid: (e) => {
      e.stopPropagation();
      set((state) => {
        const mousePt = getGirdPoint(e, state.scale, state.viewBox, state.blueprintElementPosition);
        state.isShowOption = false;
        state.selectedServiceId = null;
        state.selectedAreaId = null;
        state.resizeState = {
          isResizable: false,
          dir: -1,
        };
        state.isDrag = false;
        state.selectedLineId = null;
        return state;
      });
    },
    onMouseDown: (e) => {
      set((state) => {
        e.stopPropagation();
        state.isMoving = true;
        const newPoint = getGirdPoint(e, state.scale, state.viewBox, state.blueprintElementPosition);
        state.svgOrigin.x = newPoint.x;
        state.svgOrigin.y = newPoint.y;

        return state;
      });
    },
    onMouseleave: (e) => {},
    onMouseUp: (e) => {
      set((state) => {
        state.isDrag = false;
        state.isMoving = false;
        state.resizeState.isResizable = false;
        state.resizeState.dir = -1;
        return state;
      });
    },
    onMouseMove: (e) => {
      set((state) => {
        const { x: newPointX, y: newPointY } = getGirdPoint(
          e,
          state.scale,
          state.viewBox,
          state.blueprintElementPosition,
        );

        if (state.isLineDrawing && state.curLineId) {
          if (state.linkedServiceId) {
            const service = state.services[state.lines[state.curLineId].src.componentId];
            const linkedService = state.services[state.linkedServiceId];
            const cx = service.x - linkedService.x + 40;
            const cy = service.y - linkedService.y + 40;
            const { x, y } = getQuadrant(cx, cy, linkedService.x + 40, linkedService.y + 40);
            state.lines[state.curLineId].dst.x = x;
            state.lines[state.curLineId].dst.y = y;
          } else {
            state.lines[state.curLineId].dst.x = newPointX;
            state.lines[state.curLineId].dst.y = newPointY;
          }
          // src의 좌표 움직이기
          const service = state.services[state.lines[state.curLineId].src.componentId];
          const cx = newPointX - service.x - 40;
          const cy = newPointY - service.y - 40;
          const { x, y } = getQuadrant(cx, cy, service.x + 40, service.y + 40);
          state.lines[state.curLineId].src.x = x;
          state.lines[state.curLineId].src.y = y;
        }
        if (state.resizeState.isResizable && state.selectedAreaId) {
          const area = state.areas[state.selectedAreaId];
          state.isMoving = true;

          if (state.resizeState.dir === 1) {
            // 동
            const newWidth = newPointX - area.x;
            if (newWidth > 100) state.areas[state.selectedAreaId].width = newWidth;
          } else if (state.resizeState.dir === 2) {
            // 서
            const diff = area.x - newPointX;
            const newWidth = area.width + diff;
            if (newWidth > 100) {
              state.areas[state.selectedAreaId].width = newWidth;
              state.areas[state.selectedAreaId].x = newPointX;
            }
          } else if (state.resizeState.dir === 3) {
            // 남
            const newHeight = newPointY - area.y;
            if (newHeight > 100) state.areas[state.selectedAreaId].height = newHeight;
          } else if (state.resizeState.dir === 4) {
            // 북
            const diff = area.y - newPointY;
            const newHeight = area.height + diff;
            if (newHeight > 100) {
              state.areas[state.selectedAreaId].height = newHeight;
              state.areas[state.selectedAreaId].y = newPointY;
            }
          }
        } else if (state.isDrag) {
          const newX = Math.round((newPointX - state.offset.x) / 20) * 20;
          const newY = Math.round((newPointY - state.offset.y) / 20) * 20;
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
            // 특정 영역에 포함되어 있는지?(시작점을 기준으로 할 것이고, 끝점은 상관없음)
            for (let areaKey in state.areas) {
              const curArea = state.areas[areaKey];
              if (
                newX >= curArea.x &&
                newX <= curArea.x + curArea.width &&
                newY >= curArea.y &&
                newY <= curArea.y + curArea.height
              ) {
                // 영역에 포함되어 있다면
                // 1. 기존 영역에서 제거
                const currentOption = state.options[state.selectedServiceId];

                // const prevArea = state.areas[service.areaId];
                // if (prevArea) {
                //   const prevAreaServices = prevArea.services.filter((serviceId) => serviceId !== service.id);
                //   state.areas[service.areaId].services = prevAreaServices;
                // }
                // // 2. 새로운 영역에 추가
                // state.services[state.selectedServiceId].areaId = curArea.id;
                // state.areas[curArea.id].services.push(service.id);
                // break;
              }
            }

            service.x = newX;
            service.y = newY;
          } else if (state.selectedAreaId) {
            state.areas[state.selectedAreaId].x = newX;
            state.areas[state.selectedAreaId].y = newY;
          }
        } else if (state.isMoving) {
          state.viewBox.x = state.viewBox.x - (newPointX - state.svgOrigin.x);
          state.viewBox.y = state.viewBox.y - (newPointY - state.svgOrigin.y);
        }

        return state;
      });
    },
    onMouseWheel: (e) => {
      set((state) => {
        let scale = e.deltaY / 1000;
        if (e.deltaY !== 0) scale = Math.abs(scale) < 0.05 ? (0.05 * e.deltaY) / Math.abs(e.deltaY) : scale;
        state.scale += scale;
        if (state.scale >= 5) state.scale = 5;
        if (state.scale <= 0.5) state.scale = 0.5;
        const pt = getGirdPoint(e, state.scale, state.viewBox, state.blueprintElementPosition);

        let { x, y, width, height } = state.viewBox;

        let [xPropW, yPropH] = [(pt.x - x) / width, (pt.y - y) / height];

        let [newWidth, newHeight] = [
          state.viewBoxOriginSize.width * state.scale,
          state.viewBoxOriginSize.height * state.scale,
        ];

        let x2 = pt.x - xPropW * newWidth;
        let y2 = pt.y - yPropH * newHeight;

        state.viewBox = {
          x: x2,
          y: y2,
          width: newWidth,
          height: newHeight,
        };
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
        state.isShowOption = false;
        state.doubleClickedServiceId = null;
        state.selectedServiceId = null;
        state.selectedAreaId = null;
        state.isMoving = false;
        state.isLineDrawing = false;
        state.linkedServiceId = undefined;
        state.selectedLineId = null;
        return state;
      });
    },
  },
});
