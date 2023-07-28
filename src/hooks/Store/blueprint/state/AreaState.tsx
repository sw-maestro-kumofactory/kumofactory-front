import { AreaTypes, IArea } from '@/src/types/Area';

export interface AreaState {
  areas: Record<string, IArea>;
  selectedAreaId: string | null;
  azCount: {
    '2a': number;
    '2c': number;
  };
  subnetCount: {
    public: number;
    private: number;
    database: number;
  };
  resizeState: {
    isResizable: boolean;
    dir: number;
  };
  AreaAction: {
    setResizable: (flag: boolean, dir: number) => void;
    createArea: (area: IArea, type: AreaTypes) => void;
    onMouseDownArea: (e: React.MouseEvent, area: IArea | null) => void;
    setArea: (id: string, width: number, height: number) => void;
  };
}
