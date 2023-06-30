export interface CommonState {
  interval: {
    x: number;
    y: number;
  };
  gridSrc: {
    x: number;
    y: number;
  };
  draggable: boolean;
  resizable: {
    isResizable: boolean;
    dir: number;
  };
  CommonAction: {
    setGridSrc: (x: number, y: number) => void;
    onMouseUp: (e: React.MouseEvent) => void;
    onClickGrid: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    clearComponent: () => void;
  };
}
