export interface Point {
  x: number;
  y: number;
  componentId: string;
}

export interface Line {
  id: string;
  src: Point;
  dst: Point;
}
