export interface CommonState {
  isMouseDown: boolean;
  interval: {
    x: number;
    y: number;
  };
  CommonAction: {
    onMouseUp: (e: React.MouseEvent) => void;
    onClickGrid: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    clearComponent: () => void;
  };
}
