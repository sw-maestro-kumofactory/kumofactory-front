export const getQuadrant = (x: number, y: number, standardX: number, standardY: number): { x: number; y: number } => {
  const absX = Math.abs(x);
  const absY = Math.abs(y);
  if (x > 0 && absX > absY) {
    // 동쪽
    return { x: standardX + 90, y: standardY + 45 };
  } else if (y > 0 && absX < absY) {
    // 남쪽
    return { x: standardX + 45, y: standardY + 90 };
  } else if (x < 0 && absX > absY) {
    // 서쪽
    return { x: standardX, y: standardY + 45 };
  } else if (y < 0 && absX < absY) {
    // 북쪽
    return { x: standardX + 45, y: standardY };
  } else {
    return { x: 0, y: 0 };
  }
};
