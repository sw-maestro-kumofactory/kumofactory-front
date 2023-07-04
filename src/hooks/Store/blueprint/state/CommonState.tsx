import { Coordinate, Point } from '@/src/types/Common';

export interface CommonState {
  circles: Record<string, Point>;
  interval: Coordinate;
  gridSrc: Coordinate;
  draggable: boolean;
  isMoving: boolean;
  CommonAction: {
    setGridSrc: (x: number, y: number) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onClickGrid: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    clearComponent: () => void;
  };
}
