import { Line } from '@/src/types/Line';
import { Point } from '@/src/types/Common
export interface LineState {
  lines: Record<string, Line>;
  srcPoint: string;
  dstPoint: string;
  LineAction: {
    setLineDrawingMode: (flag: boolean) => void;
  };
}
