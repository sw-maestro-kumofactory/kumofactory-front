import { Line } from '@/src/types/Line';
import { Point } from '@/src/types/Line';

export interface LineState {
  lines: Record<string, Line>;
  curLineId: string | undefined;
  srcPoint: string;
  dstPoint: string;
  linkedServiceId: string | undefined;
  selectedLineId: string | null;
  LineAction: {
    setLineDrawingMode: (flag: boolean) => void;
    createLine: (id: string, src: Point, dst: Point) => void;
    setComponentLine: (lineId: string, componentId: string) => void;
    onClickLine: (id: string | null) => void;
  };
}
