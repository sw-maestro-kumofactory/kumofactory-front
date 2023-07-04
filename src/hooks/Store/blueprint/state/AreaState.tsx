import { IArea } from '@/src/types/Area';

export interface AreaState {
  areas: Record<string, IArea>;
  selectedArea: IArea | null;
  resizable: {
    isResizable: boolean;
    dir: number;
  };
  AreaAction: {
    setResizable: (flag: boolean, dir: number) => void;
    createArea: (area: IArea) => void;
    onMouseDownArea: (e: React.MouseEvent, area: IArea | null) => void;
    setArea: (id: string, width: number, height: number) => void;
  };
}
