import { Coordinate, Point } from '@/src/types/Common';

export interface CommonState {
  circles: Record<string, Point>;
  interval: Coordinate;
  gridSrc: Coordinate;
  draggable: boolean;
  isMoving: boolean;
  scale: number;
  oneByFourPoint: number;
  viewBox: {
    width: number;
    height: number;
  };
  CommonAction: {
    setGridSrc: (x: number, y: number) => void;
    setViewBox: (width: number, height: number) => void;
    setScale: (scale: number) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onClickGrid: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    clearComponent: () => void;
  };
}
