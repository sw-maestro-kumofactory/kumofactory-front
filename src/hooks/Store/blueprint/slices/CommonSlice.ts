import { StateCreator } from 'zustand';

import { CommonState } from '@/src/hooks/Store/blueprint/state/CommonState';
import { BlueprintResponse, BlueprintScope } from '@/src/types/Blueprint';
import { getQuadrant } from '@/src/utils/getQuadrant';
import { AllBluePrintStates } from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { EC2Options } from '@/src/types/Services';

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
  currentBlueprintId: '',
  blueprintScope: {},
  blueprintList: [],
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
    initState: (id: string) => {
      set((state) => {
        state.blueprintList.push(id);
        state.currentBlueprintId = id;
        state.subnetCount[id] = {
          public: 0,
          private: 0,
          database: 0,
        };
        state.azCount[id] = {
          '2a': 0,
          '2c': 0,
        };
        state.blueprintScope[id] = 'PRIVATE';
        state.services[id] = {};
        state.lines[id] = {};
        state.areas[id] = {};
        return state;
      });
    },
    setBlueprintScope: (id: string, scope: BlueprintScope) => {
      set((state) => {
        state.blueprintScope[id] = scope;
        return state;
      });
    },
    setBlueprintId: (id: string) => {
      set((state) => {
        state.currentBlueprintId = id;
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
    blueprintToJson: ({ id, name }: { id: string; name: string }) => {
      const json: BlueprintResponse = {
        name: name,
        uuid: id,
        scope: 'PRIVATE',
        components: [],
        links: [],
        areas: [],
        svgFile: '',
      };
      // services
      for (const service of Object.values(get().services[id])) {
        json['components'].push({
          id: service.id,
          x: service.x,
          y: service.y,
          type: service.type,
          options: {},
        });
      }
      // links
      for (const line of Object.values(get().lines[id])) {
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
      for (const area of Object.values(get().areas[id])) {
        json['areas'].push({
          id: area.id,
          x: area.x,
          y: area.y,
          width: area.width,
          height: area.height,
          type: area.type,
          scope: area.scope,
          az: area.az,
        });
      }
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
        const currentCount = state.subnetCount[state.currentBlueprintId];
        for (let areaId in state.areas[state.currentBlueprintId]) {
          const currentArea = state.areas[state.currentBlueprintId][areaId];
          let containRDS = false;
          for (let serviceId in state.services[state.currentBlueprintId]) {
            const currentService = state.services[state.currentBlueprintId][serviceId];
            const currentOption = state.options[serviceId] as EC2Options;
            if (
              currentService.x >= currentArea.x &&
              currentService.x + 80 <= currentArea.x + currentArea.width &&
              currentService.y >= currentArea.y &&
              currentService.y + 80 <= currentArea.y + currentArea.height
            ) {
              if (currentArea.type === 'SUBNET') {
                if (currentArea.scope === 'PRIVATE') {
                  if (currentService.type === 'RDS_MYSQL') {
                    containRDS = true;
                    currentArea.scope = 'DATABASE';
                    currentCount['database'] += 1;
                    currentCount['private'] -= 1;
                    currentOption['subnetType'] = 'DATABASE';
                  } else {
                    currentOption['subnetType'] = 'PRIVATE';
                  }
                } else if (currentArea.scope === 'DATABASE') {
                  if (currentService.type !== 'RDS_MYSQL') {
                    currentArea.scope = 'PRIVATE';
                    currentCount['database'] -= 1;
                    currentCount['private'] += 1;
                    currentOption['subnetType'] = 'PRIVATE';
                  } else {
                    containRDS = true;
                    currentOption['subnetType'] = 'DATABASE';
                  }
                } else {
                  currentOption['subnetType'] = 'PUBLIC';
                }
              } else if (currentArea.type === 'AZ') {
                currentOption['availabilityZone'] = currentArea.az;
              }
            }
          }
          if (currentArea.type === 'SUBNET' && currentArea.scope === 'DATABASE' && !containRDS) {
            currentArea.scope = 'PRIVATE';
            currentCount['database'] -= 1;
            currentCount['private'] += 1;
          }
        }

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
        const currentService = state.services[state.currentBlueprintId];
        const currentAreas = state.areas[state.currentBlueprintId];
        const currentLines = state.lines[state.currentBlueprintId];
        if (state.isLineDrawing && state.curLineId) {
          const currentLines = state.lines[state.currentBlueprintId];
          if (state.linkedServiceId) {
            const service = currentService[state.lines[state.currentBlueprintId][state.curLineId].src.componentId];
            const linkedService = currentService[state.linkedServiceId];
            const cx = service.x - linkedService.x + 40;
            const cy = service.y - linkedService.y + 40;
            const { x, y } = getQuadrant(cx, cy, linkedService.x + 40, linkedService.y + 40);
            currentLines[state.curLineId].dst.x = x;
            currentLines[state.curLineId].dst.y = y;
          } else {
            currentLines[state.curLineId].dst.x = newPointX;
            currentLines[state.curLineId].dst.y = newPointY;
          }
          // src의 좌표 움직이기
          const service = currentService[state.lines[state.currentBlueprintId][state.curLineId].src.componentId];
          const cx = newPointX - service.x - 40;
          const cy = newPointY - service.y - 40;
          const { x, y } = getQuadrant(cx, cy, service.x + 40, service.y + 40);
          currentLines[state.curLineId].src.x = x;
          currentLines[state.curLineId].src.y = y;
        }
        if (state.resizeState.isResizable && state.selectedAreaId) {
          const area = currentAreas[state.selectedAreaId];
          state.isMoving = true;

          if (state.resizeState.dir === 1) {
            // 동
            const newWidth = newPointX - area.x;
            if (newWidth > 100) state.areas[state.currentBlueprintId][state.selectedAreaId].width = newWidth;
          } else if (state.resizeState.dir === 2) {
            // 서
            const diff = area.x - newPointX;
            const newWidth = area.width + diff;
            if (newWidth > 100) {
              currentAreas[state.selectedAreaId].width = newWidth;
              currentAreas[state.selectedAreaId].x = newPointX;
            }
          } else if (state.resizeState.dir === 3) {
            // 남
            const newHeight = newPointY - area.y;
            if (newHeight > 100) currentAreas[state.selectedAreaId].height = newHeight;
          } else if (state.resizeState.dir === 4) {
            // 북
            const diff = area.y - newPointY;
            const newHeight = area.height + diff;
            if (newHeight > 100) {
              currentAreas[state.selectedAreaId].height = newHeight;
              currentAreas[state.selectedAreaId].y = newPointY;
            }
          }
        } else if (state.isDrag) {
          const newX = Math.round((newPointX - state.offset.x) / 20) * 20;
          const newY = Math.round((newPointY - state.offset.y) / 20) * 20;
          if (state.selectedServiceId) {
            const service = currentService[state.selectedServiceId];
            //선택된 선 처리
            service.lines.forEach((line) => {
              const srcService = currentService[currentLines[line].src.componentId];
              const dstService = currentService[currentLines[line].dst.componentId];
              const src = currentLines[line].src;
              const dst = currentLines[line].dst;

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
            // 특정 영역에 포함되어 있는지?(시작점을 기준으로 할 것이고 완전히 포함되어야 함.)
            if (currentService[state.selectedServiceId].type === 'EC2') {
              for (let areaKey in currentAreas) {
                const curArea = currentAreas[areaKey];
                if (
                  newX >= curArea.x &&
                  newX <= curArea.x + curArea.width &&
                  newY >= curArea.y &&
                  newY <= curArea.y + curArea.height
                ) {
                  const currentOption = state.options[state.selectedServiceId];
                }
              }
            }

            service.x = newX;
            service.y = newY;
          } else if (state.selectedAreaId) {
            currentAreas[state.selectedAreaId].x = newX;
            currentAreas[state.selectedAreaId].y = newY;
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
        const currentSubnetCount = state.subnetCount[state.currentBlueprintId];
        const currentAzCount = state.azCount[state.currentBlueprintId];
        if (state.selectedServiceId) {
          //   selectedService 제거
          const currentService = state.services[state.currentBlueprintId][state.selectedServiceId];
          delete state.services[state.currentBlueprintId][state.selectedServiceId];
          for (const line of currentService.lines) {
            const removedLine = state.lines[state.currentBlueprintId][line];
            if (removedLine.src.componentId === state.selectedServiceId) {
              const dstService = state.services[state.currentBlueprintId][removedLine.dst.componentId];
              dstService.lines = dstService.lines.filter((l) => l !== line);
            } else {
              const srcService = state.services[state.currentBlueprintId][removedLine.src.componentId];
              srcService.lines = srcService.lines.filter((l) => l !== line);
            }
            delete state.lines[state.currentBlueprintId][line];
          }
        } else if (state.selectedAreaId) {
          const curArea = state.areas[state.currentBlueprintId][state.selectedAreaId];
          if (curArea.type === 'AZ') {
            if (curArea.az === 'AP_NORTHEAST_2A') currentAzCount['2a'] -= 1;
            else if (curArea.az === 'AP_NORTHEAST_2C') currentAzCount['2c'] -= 1;
          } else if (curArea.type === 'SUBNET') {
            if (curArea.scope === 'PUBLIC') currentSubnetCount.public -= 1;
            else if (curArea.scope === 'PRIVATE') currentSubnetCount.private -= 1;
            else if (curArea.scope === 'DATABASE') currentSubnetCount.database -= 1;
          }
          delete state.areas[state.currentBlueprintId][state.selectedAreaId];
        } else if (state.selectedLineId) {
          //   selectedLine 제거
          const line = state.lines[state.currentBlueprintId][state.selectedLineId];
          const srcService = state.services[state.currentBlueprintId][line.src.componentId];
          const dstService = state.services[state.currentBlueprintId][line.dst.componentId];
          srcService.lines = srcService.lines.filter((l) => l !== state.selectedLineId);
          dstService.lines = dstService.lines.filter((l) => l !== state.selectedLineId);
          delete state.lines[state.currentBlueprintId][state.selectedLineId];
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
