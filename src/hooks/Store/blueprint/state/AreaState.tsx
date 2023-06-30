import { IArea } from '@/src/types/Area';

export interface AreaState {
  areas: Record<string, IArea>;
  selectedArea: IArea | null;
  AreaAction: {
    createArea: (area: IArea) => void;
    onMouseDownArea: (e: React.MouseEvent, area: IArea | null) => void;
  };
}
