'use client';
import Service from '@/src/components/AWSService/Service';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { useEffect, useState } from 'react';
import Loading from '@/src/components/common/Loading';
import Options from '@/src/components/AWSService/Option/Options';
import { ExportButton } from '@/src/components/Blueprint/FloatingButton/Export/ExportButton';
import AZ from '@/src/components/AWSService/Area/AZ';
import CreateLineContainer from '@/src/components/Blueprint/FloatingButton/CreateLine/CreateLineContainer';
import Circle from '@/src/components/Blueprint/Circle/Circle';

interface IViewBox {
  width: number;
  height: number;
}

const Grid = () => {
  const [viewBox, setViewBox] = useState<IViewBox | null>(null);
  const areas = useBlueprintStore((state) => state.areas);
  const selectedArea = useBlueprintStore((state) => state.selectedArea);
  const services = useBlueprintStore((state) => state.services);
  const selectedServiceId = useBlueprintStore((state) => state.selectedServiceId);
  const isMoving = useBlueprintStore((state) => state.isMoving);
  const gridSrc = useBlueprintStore((state) => state.gridSrc);
  const srcPoint = useBlueprintStore((state) => state.srcPoint);
  const dstPoint = useBlueprintStore((state) => state.dstPoint);
  const lines = useBlueprintStore((state) => state.lines);
  const circles = useBlueprintStore((state) => state.circles);
  const { onMouseDownService, onMouseEnterService } = useBlueprintStore((state) => state.ServiceAction);
  const { onClickGrid, onMouseUp, onMouseMove, setGridSrc } = useBlueprintStore((state) => state.CommonAction);
  const { setLineDrawingMode } = useBlueprintStore((state) => state.LineAction);
  const {} = useBlueprintStore((state) => state.AreaAction);
  // ESC to remove service
  useEffect(() => {
    const escKeyInput = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLineDrawingMode(false);
      }
    };
    window.addEventListener('keydown', escKeyInput);
    return () => {
      window.removeEventListener('keydown', escKeyInput);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const component = document.querySelector('.grid-wrapper')!;
      const box = component.getBoundingClientRect();
      setGridSrc(box.x, box.y);
      const { width, height } = component?.getBoundingClientRect() || { width: 0, height: 0 };
      setViewBox({ width, height });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='grid-wrapper w-full h-full overflow-hidden '>
      <ExportButton />
      {viewBox ? (
        <div id='blueprint'>
          <svg
            width={viewBox.width}
            height={viewBox.height}
            viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
            onClick={onClickGrid}
            onMouseUp={onMouseUp}
            onMouseMove={(e: React.MouseEvent) => onMouseMove(e)}
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='background'>
              <defs>
                <pattern id='grayPattern' width='90' height='90' patternUnits='userSpaceOnUse'>
                  <path d='M -45 45 L 135 45' stroke='gray' strokeWidth='1' />
                  <path d='M 45 -45 L 45 135' stroke='gray' strokeWidth='1' />
                </pattern>
                <pattern id='boldPattern' width='90' height='90' patternUnits='userSpaceOnUse'>
                  <path d='M 0 0 L 90 0 90 90 0 90 z' stroke='black' strokeWidth='1.5' fill='none' />
                </pattern>
              </defs>
              <rect fill='url(#boldPattern)' width={viewBox.width} height={viewBox.height} />
              <rect fill='url(#grayPattern)' width={viewBox.width} height={viewBox.height} />
            </g>
            <g id='zone'>
              {Object.keys(areas).map((key) => (
                <AZ key={areas[key].id} Area={areas[key]} activate={selectedArea?.id === areas[key].id} />
              ))}
            </g>
            <g id='services'>
              {Object.keys(services).map((key) => (
                <Service
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    onMouseDownService(e, services[key]);
                  }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    onMouseEnterService(e, services[key]);
                  }}
                  key={services[key].id}
                  isActive={services[key].id === selectedServiceId}
                  id={services[key].id}
                  x={services[key].x}
                  y={services[key].y}
                  type={services[key].type}
                  lines={services[key].lines}
                />
              ))}
            </g>
            {Object.keys(lines).map((key) => (
              <line
                key={key}
                x1={circles[lines[key].srcId].x}
                y1={circles[lines[key].srcId].y}
                x2={circles[lines[key].dstId].x}
                y2={circles[lines[key].dstId].y}
                stroke={'black'}
              />
            ))}
            {Object.keys(circles).map((key) => {
              if (circles[key].x === 0) return null;
              return <Circle key={key} id={key} cx={circles[key].x} cy={circles[key].y} />;
            })}
            {/* Temp Line */}
            {circles[dstPoint] && circles[dstPoint].x !== 0 && (
              <line
                key={'tempLine'}
                x1={circles[srcPoint].x}
                y1={circles[srcPoint].y}
                x2={circles[dstPoint].x}
                y2={circles[dstPoint].y}
                strokeWidth={2}
                stroke={'black'}
              />
            )}
          </svg>
        </div>
      ) : (
        <Loading />
      )}

      {selectedServiceId && !isMoving && (
        <>
          <Options serviceType={services[selectedServiceId].type} />
          <CreateLineContainer
            x={services[selectedServiceId].x + gridSrc.x + 100}
            y={services[selectedServiceId].y + gridSrc.y - 10}
          />
        </>
      )}
    </div>
  );
};

export default Grid;
