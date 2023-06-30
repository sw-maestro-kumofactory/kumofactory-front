'use client';
import { IArea } from '@/src/types/Area';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

interface IProps {
  Area: IArea;
  activate: boolean;
}

const AZ = ({ Area, activate }: IProps) => {
  const onMouseDownArea = useBlueprintStore((state) => state.AreaAction.onMouseDownArea);
  return (
    <svg onMouseDown={(e) => onMouseDownArea(e, Area)}>
      <rect x={Area.sx} y={Area.sy} fill='#C9DFF985' width={Area.width} height={Area.height} />
      {activate && <rect x={Area.sx} y={Area.sy} fill='#C9DFF985' width={Area.width} height={Area.height} />}
      <text x={Area.sx} y={Area.sy}>
        Availability zone
      </text>
    </svg>
  );
};
export default AZ;
