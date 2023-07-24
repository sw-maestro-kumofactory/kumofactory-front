import { StateCreator } from 'zustand';
import { v1 } from 'uuid';

import { LineState } from '@/src/hooks/Store/blueprint/state/LineState';
import { Point } from '@/src/types/Line';
import { AllBluePrintStates } from '@/src/hooks/Store/blueprint/useBlueprintStore';

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
  selectedLineId: null,
  LineAction: {
    // flag === true => lineDrawing mode on
    // flag === false => lineDrawing mode off
    onClickLine: (id) =>
      set((state) => {
        if (!state.isLineDrawing) {
          state.selectedLineId = id;
        }
        return state;
      }),
    setLineDrawingMode: (flag: boolean) =>
      set((state) => {
        if (flag && state.selectedServiceId) {
          state.isLineDrawing = true;
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
          state.isLineDrawing = false;
          state.srcPoint = '';
          state.dstPoint = '';
        }
        return state;
      }),
    createLine: (id: string, src: Point, dst: Point) =>
      set((state) => {
        state.lines[id] = {
          id: id,
          src: {
            x: src.x,
            y: src.y,
            componentId: src.componentId,
          },
          dst: {
            x: dst.x,
            y: dst.y,
            componentId: dst.componentId,
          },
        };
        return state;
      }),
    setComponentLine: (lineId: string, componentId: string) =>
      set((state) => {
        state.services[componentId].lines.push(lineId);
        return state;
      }),
  },
});
