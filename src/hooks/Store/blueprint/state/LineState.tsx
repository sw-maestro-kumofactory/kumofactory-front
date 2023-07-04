import { Line } from '@/src/types/Line';

export interface LineState {
  lines: Record<string, Line>;
  srcPoint: string;
  dstPoint: string;
  LineAction: {
    setLineDrawingMode: (flag: boolean) => void;
  };
}
