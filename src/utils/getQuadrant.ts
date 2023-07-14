// params
// x : component의 x좌표
// y : component의 y좌표
// standardX : component의 중앙 x좌표
// standardY : component의 중앙 y좌표
export const getQuadrant = (x: number, y: number, standardX: number, standardY: number): { x: number; y: number } => {
  const absX = Math.abs(x);
  const absY = Math.abs(y);
  if (x >= 0 && absX >= absY) {
    // 동쪽
    return { x: standardX + 40, y: standardY };
  } else if (y >= 0 && absX <= absY) {
    // 남쪽
    return { x: standardX, y: standardY + 40 };
  } else if (x <= 0 && absX >= absY) {
    // 서쪽
    return { x: standardX - 40, y: standardY };
  } else if (y <= 0 && absX <= absY) {
    // 북쪽
    return { x: standardX, y: standardY - 40 };
  } else {
    return { x: 0, y: 0 };
  }
};
