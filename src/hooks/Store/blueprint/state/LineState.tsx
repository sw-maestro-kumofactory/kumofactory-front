import { Line } from '@/src/types/Line';

export interface LineState {
  lines: Record<string, Line>;
  curLineId: string | undefined;
  srcPoint: string;
  dstPoint: string;
  linkedServiceId: string | undefined;
  LineAction: {
    setLineDrawingMode: (flag: boolean) => void;
  };
}
