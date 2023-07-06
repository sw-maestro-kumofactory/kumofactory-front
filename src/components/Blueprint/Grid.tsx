'use client';
import Service from '@/src/components/AWSService/Service';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { useEffect } from 'react';
import Loading from '@/src/components/common/Loading';
import Options from '@/src/components/AWSService/Option/Options';
import { ExportButton } from '@/src/components/Blueprint/FloatingButton/Export/ExportButton';
import AZ from '@/src/components/AWSService/Area/AZ';
import CreateLineContainer from '@/src/components/Blueprint/FloatingButton/CreateLine/CreateLineContainer';
import Circle from '@/src/components/Blueprint/Circle/Circle';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const Grid = () => {
  const areas = useBlueprintStore((state) => state.areas);
  const selectedArea = useBlueprintStore((state) => state.selectedArea);
  const services = useBlueprintStore((state) => state.services);
  const selectedServiceId = useBlueprintStore((state) => state.selectedServiceId);
  const isMoving = useBlueprintStore((state) => state.isMoving);
  const gridSrc = useBlueprintStore((state) => state.gridSrc);
  const viewBox = useBlueprintStore((state) => state.viewBox);
  const srcPoint = useBlueprintStore((state) => state.srcPoint);
  const dstPoint = useBlueprintStore((state) => state.dstPoint);
  const lines = useBlueprintStore((state) => state.lines);
  const circles = useBlueprintStore((state) => state.circles);
  const { onMouseDownService, onMouseEnterService } = useBlueprintStore((state) => state.ServiceAction);
  const { onClickGrid, onMouseUp, onMouseMove, setGridSrc, setViewBox, setScale } = useBlueprintStore(
    (state) => state.CommonAction,
  );
  const { setLineDrawingMode } = useBlueprintStore((state) => state.LineAction);
  const {} = useBlueprintStore((state) => state.AreaAction);

  // @ts-ignore
  function handleScaleChange(e) {
    setScale(e.instance.transformState.scale);
  }

  useEffect(() => {
    const escKeyInput = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLineDrawingMode(false);
      }
    };
    const handleResize = () => {
      const component = document.querySelector('.grid-wrapper')!;
      const box = component.getBoundingClientRect();
      setGridSrc(box.x, box.y);
      const { width, height } = component?.getBoundingClientRect() || { width: 0, height: 0 };
      setViewBox(width, height);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', escKeyInput);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', escKeyInput);
    };
  }, []);

  return (
    <div className='grid-wrapper w-full h-full overflow-hidden'>
      <ExportButton />
      {selectedServiceId && !isMoving && (
        <>
          <Options serviceType={services[selectedServiceId].type} />
          <CreateLineContainer
            x={services[selectedServiceId].x + gridSrc.x + 100}
            y={services[selectedServiceId].y + gridSrc.y - 10}
          />
        </>
      )}
      <TransformWrapper
        minScale={0.5}
        initialScale={1}
        maxScale={10}
        defaultScale={1}
        onTransformed={(e: any) => {
          handleScaleChange(e);
        }}
      >
        <TransformComponent>
          {viewBox ? (
            <div id='blueprint'>
              <svg
                width={viewBox.width}
                height={viewBox.height}
                viewBox={`${-(viewBox.width - 80) / 2} ${-(viewBox.height - 350) / 2}  ${viewBox.width + 1000} ${
                  viewBox.height + 1000
                }`}
                onClick={onClickGrid}
                onMouseUp={onMouseUp}
                onMouseMove={(e: React.MouseEvent) => {
                  if (selectedServiceId) e.stopPropagation();
                  onMouseMove(e);
                }}
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
                  {/* 이 부분 고정 */}
                  <rect fill='url(#boldPattern)' width={1080} height={1350} className='cursor-move' />
                  <rect fill='url(#grayPattern)' width={1080} height={1350} className='cursor-move' />
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
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
export default Grid;
