import { useState } from 'react';

interface IProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}
interface Point {
  x: number;
  y: number;
}
const Line = ({ x1, x2, y1, y2 }: IProps) => {
  const [joint, setJoint] = useState<Point[]>([]);

  return (
    <>
      {/* 5개로 나누어짐. */}
      <line x1={x1} x2={x2} y1={y1} y2={y2} strokeWidth={2} stroke='gray' />;
    </>
  );
};

export default Line;
