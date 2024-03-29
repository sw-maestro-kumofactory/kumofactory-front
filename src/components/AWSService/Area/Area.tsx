import { useEffect, useRef, useState } from 'react';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { AreaTypes, IArea } from '@/src/types/Area';
import { AreaStyle } from '@/src/assets/AreaStyle';

interface IProps {
  area: IArea;
  activate: boolean;
  styleKey: string;
}

const Area = ({ area, activate, styleKey }: IProps) => {
  const onMouseDownArea = useBlueprintStore((state) => state.AreaAction.onMouseDownArea);
  const setResizable = useBlueprintStore((state) => state.AreaAction.setResizable);
  const svgRef = useRef<SVGSVGElement>(null);

  const getName = (area: IArea) => {
    if (area.type === 'VPC') return 'VPC';
    if (area.type === 'SUBNET') return area.scope;
    if (area.type === 'AZ') return 'Availability Zone';
  };

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.setAttribute('x', area.x.toString());
      svgRef.current.setAttribute('y', area.y.toString());
      svgRef.current.setAttribute('width', area.width.toString());
      svgRef.current.setAttribute('height', area.height.toString());
    }
  }, [area.x, area.y, area.width, area.height]);

  return (
    <>
      <svg
        ref={svgRef}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onMouseDownArea(e, area);
        }}
      >
        <rect
          fill={AreaStyle[styleKey].fill}
          width={area.width}
          height={area.height}
          strokeWidth={2}
          stroke={AreaStyle[styleKey].stroke}
          strokeDasharray={10}
        />
        <text x='10' y='20' className='text-sm select-none'>
          {getName(area)}
        </text>
        {activate && (
          <>
            <line
              className='cursor-n-resize'
              strokeWidth='8'
              stroke='#799ACF'
              x1='0'
              y1='0'
              x2={area.width}
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
              y1={area.height}
              x2={area.width}
              y2={area.height}
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
              y2={area.height}
              strokeLinecap='round'
              onMouseDown={() => {
                setResizable(true, 2);
              }}
            />
            <line
              className='cursor-e-resize'
              strokeWidth='8'
              stroke='#799ACF'
              x1={area.width}
              y1='0'
              x2={area.width}
              y2={area.height}
              strokeLinecap='round'
              onMouseDown={() => {
                setResizable(true, 1);
              }}
            />
          </>
        )}
      </svg>
      {/*<foreignObject*/}
      {/*  className='-z-20 select-auto'*/}
      {/*  x={area.x}*/}
      {/*  y={area.y - 20}*/}
      {/*  width={getName(area)!.length * 12}*/}
      {/*  height='20'*/}
      {/*>*/}
      {/*  <div className='-z-20 w-fit select-none '>{getName(area)}</div>*/}
      {/*</foreignObject>*/}
    </>
  );
};

export default Area;
