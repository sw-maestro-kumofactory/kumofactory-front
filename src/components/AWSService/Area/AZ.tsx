'use client';
import { IArea } from '@/src/types/Area';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

interface IProps {
  Area: IArea;
  activate: boolean;
}

const AZ = ({ Area, activate }: IProps) => {
  const onMouseDownArea = useBlueprintStore((state) => state.AreaAction.onMouseDownArea);
  const setResizable = useBlueprintStore((state) => state.AreaAction.setResizable);
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
      {activate && (
        // 상 하 좌 우
        <>
          <line
            className='cursor-n-resize'
            strokeWidth='8'
            stroke='#799ACF'
            x1={Area.sx}
            y1={Area.sy}
            x2={Area.sx + Area.width}
            y2={Area.sy}
            strokeLinecap='round'
            onMouseDown={() => {
              setResizable(true, 4);
            }}
          />
          <line
            className='cursor-s-resize'
            strokeWidth='8'
            stroke='#799ACF'
            x1={Area.sx}
            y1={Area.sy + Area.height}
            x2={Area.sx + Area.width}
            y2={Area.sy + Area.height}
            strokeLinecap='round'
            onMouseDown={() => {
              setResizable(true, 3);
            }}
          />
          <line
            className='cursor-w-resize'
            strokeWidth='8'
            stroke='#799ACF'
            x1={Area.sx}
            y1={Area.sy}
            x2={Area.sx}
            y2={Area.sy + Area.height}
            strokeLinecap='round'
            onMouseDown={() => {
              setResizable(true, 2);
            }}
          />
          <line
            className='cursor-e-resize'
            strokeWidth='8'
            stroke='#799ACF'
            x1={Area.sx + Area.width}
            y1={Area.sy}
            x2={Area.sx + Area.width}
            y2={Area.sy + Area.height}
            strokeLinecap='round'
            onMouseDown={() => {
              setResizable(true, 1);
            }}
          />
        </>
      )}

      <rect
        x={Area.sx}
        y={Area.sy}
        fill={'#00000011'}
        width={Area.width}
        height={Area.height}
        strokeWidth={2}
        stroke={'black'}
        strokeDasharray={10}
      />
      <text x={Area.sx} y={Area.sy}>
        Availability zone
      </text>
    </svg>
  );
};
export default AZ;
