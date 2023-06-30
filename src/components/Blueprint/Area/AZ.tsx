'use client';
import { IArea } from '@/src/types/Area';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { Resizable } from 're-resizable';

interface IProps {
  Area: IArea;
  activate: boolean;
}

const AZ = ({ Area, activate }: IProps) => {
  const onMouseDownArea = useBlueprintStore((state) => state.AreaAction.onMouseDownArea);
  return (
    <svg
      onClick={(e) => {
        e.stopPropagation();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDownArea(e, Area);
      }}
    >
      {activate && <line strokeWidth='2' fill='red' x1={Area.sx} y1={Area.sy} x2={Area.sx + Area.width} y2={Area.sy} />}
      <rect
        x={Area.sx}
        y={Area.sy}
        fill={activate ? '#C9DFF9cc' : '#C0DFF985'}
        width={Area.width}
        height={Area.height}
      />
      <text x={Area.sx} y={Area.sy}>
        Availability zone
      </text>
    </svg>
  );
};
export default AZ;
