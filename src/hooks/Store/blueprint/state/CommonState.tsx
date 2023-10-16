import { Coordinate } from '@/src/types/Common';
import { BlueprintInfo, BlueprintResponse, BlueprintScope } from '@/src/types/Blueprint';

export interface CommonState {
  currentBlueprintInfo: BlueprintInfo;
  blueprintScope: Record<string, BlueprintScope>;
  blueprintList: string[];
  isEdit: boolean;
  offset: Coordinate;
  gridSrc: Coordinate;
  blueprintElementPosition: Coordinate;
  isDrag: boolean;
  isMoving: boolean;
  isShowOption: boolean;
  isTemplateOpen: boolean;
  showDetail: string;
  scale: number;
  quarterPoint: number;
  viewBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  svgOrigin: {
    x: number;
    y: number;
  };
  viewBoxOriginSize: {
    width: number;
    height: number;
  };
  CommonAction: {
    initState: (id: string) => void;
    initMouseState: () => void;
    setIsTemplateOpen: (flag: boolean) => void;
    setBlueprintId: (id: string) => void;
    setBlueprintScope: (id: string, scope: BlueprintScope) => void;
    setCurrentBlueprintInfo: (info: BlueprintInfo) => void;
    setInfo: (name: string, description: string) => void;
    setIsEdit: (flag: boolean) => void;
    blueprintToJson: ({
      id,
      name,
      description,
      scope,
    }: {
      id: string;
      name: string;
      description: string;
      scope: BlueprintScope;
    }) => BlueprintResponse;
    setShowDetail: (id: string) => void;
    setBlueprintSrc: (x: number, y: number) => void;
    setGridSrc: () => void;
    setViewBox: (width: number, height: number) => void;
    clearComponent: () => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onMouseleave: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseWheel: (e: React.WheelEvent) => void;
    onClickGrid: (e: React.MouseEvent) => void;
  };
}
