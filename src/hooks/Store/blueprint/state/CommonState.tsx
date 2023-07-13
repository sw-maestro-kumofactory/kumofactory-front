import { Coordinate, Point } from '@/src/types/Common';

export interface CommonState {
  name: string;
  interval: Coordinate;
  gridSrc: Coordinate;
  blueprintSrc: Coordinate;
  draggable: boolean;
  isMoving: boolean;
  scale: number;
  stdScale: number | null;
  oneByFourPoint: number;
  viewBox: {
    width: number;
    height: number;
  };
  CommonAction: {
    setName: (e: React.SyntheticEvent) => void;
    blueprintToJson: () => void;
    setBlueprintSrc: (x: number, y: number) => void;
    setGridSrc: () => void;
    setStdScale: () => void;
    setViewBox: (width: number, height: number) => void;
    setScale: (scale: number) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onClickGrid: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    clearComponent: () => void;
  };
}
