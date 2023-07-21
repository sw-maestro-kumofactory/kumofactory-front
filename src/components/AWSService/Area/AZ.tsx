import { useEffect, useRef } from 'react';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { IArea } from '@/src/types/Area';

interface IProps {
  Area: IArea;
  activate: boolean;
}

const AZ = ({ Area, activate }: IProps) => {
  const onMouseDownArea = useBlueprintStore((state) => state.AreaAction.onMouseDownArea);
  const setResizable = useBlueprintStore((state) => state.AreaAction.setResizable);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.setAttribute('x', Area.sx.toString());
      svgRef.current.setAttribute('y', Area.sy.toString());
      svgRef.current.setAttribute('width', Area.width.toString());
      svgRef.current.setAttribute('height', Area.height.toString());
    }
  }, [Area.sx, Area.sy, Area.width, Area.height]);

  return (
    <svg
      ref={svgRef}
      viewBox={`-4 -4 ${Area.width + 8} ${Area.height + 8}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDownArea(e, Area);
      }}
    >
      {activate && (
        <>
          <line
            className='cursor-n-resize'
            strokeWidth='8'
            stroke='#799ACF'
            x1='0'
            y1='0'
            x2={Area.width}
            y2='0'
            strokeLinecap='round'
            onMouseDown={() => {
              setResizable(true, 4);
            }}
          />
          <line
            className='cursor-s-resize'
            strokeWidth='8'
            stroke='#799ACF'
            x1='0'
            y1={Area.height}
            x2={Area.width}
            y2={Area.height}
            strokeLinecap='round'
            onMouseDown={() => {
              setResizable(true, 3);
            }}
          />
          <line
            className='cursor-w-resize'
            strokeWidth='8'
            stroke='#799ACF'
            x1='0'
            y1='0'
            x2='0'
            y2={Area.height}
            strokeLinecap='round'
            onMouseDown={() => {
              setResizable(true, 2);
            }}
          />
          <line
            className='cursor-e-resize'
            strokeWidth='8'
            stroke='#799ACF'
            x1={Area.width}
            y1='0'
            x2={Area.width}
            y2={Area.height}
            strokeLinecap='round'
            onMouseDown={() => {
              setResizable(true, 1);
            }}
          />
        </>
      )}
      <rect
        fill={'#00000011'}
        width={Area.width}
        height={Area.height}
        strokeWidth={2}
        stroke={'black'}
        strokeDasharray={10}
      />
      <text x='10' y='20'>
        Availability zone
      </text>
    </svg>
  );
};

export default AZ;
