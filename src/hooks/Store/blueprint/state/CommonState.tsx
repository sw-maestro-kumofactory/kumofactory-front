import { ChangeEvent } from 'react';

import { Coordinate, Point } from '@/src/types/Common';
import { BlueprintResponse } from '@/src/types/Blueprint';

export interface CommonState {
  name: string;
  isEdit: boolean;
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
    initState: () => void;
    setName: (name: string) => void;
    setIsEdit: (flag: boolean) => void;
    blueprintToJson: () => BlueprintResponse;
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
