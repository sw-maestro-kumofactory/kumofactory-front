'use client';
import { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import Service from '@/src/components/AWSService/Service';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import Loading from '@/src/components/common/Loading';
import { ExportButton } from '@/src/components/Blueprint/FloatingButton/Export/ExportButton';
import AZ from '@/src/components/AWSService/Area/AZ';
import CreateLineContainer from '@/src/components/Blueprint/FloatingButton/CreateLine/CreateLineContainer';
import Circle from '@/src/components/Blueprint/Circle/Circle';

const Grid = () => {
  const areas = useBlueprintStore((state) => state.areas);
  const selectedAreaId = useBlueprintStore((state) => state.selectedAreaId);
  const services = useBlueprintStore((state) => state.services);
  const selectedServiceId = useBlueprintStore((state) => state.selectedServiceId);
  const isMoving = useBlueprintStore((state) => state.isMoving);
  const viewBox = useBlueprintStore((state) => state.viewBox);
  const srcPoint = useBlueprintStore((state) => state.srcPoint);
  const dstPoint = useBlueprintStore((state) => state.dstPoint);
  const lines = useBlueprintStore((state) => state.lines);
  const circles = useBlueprintStore((state) => state.circles);
  const lineDrawingLocation = useBlueprintStore((state) => state.lineDrawingLocation);
  const { onMouseDownService, onMouseEnterService, onMouseLeaveService } = useBlueprintStore(
    (state) => state.ServiceAction,
  );
  const {
    onClickGrid,
    onMouseUp,
    onMouseMove,
    setGridSrc,
    setBlueprintSrc,
    setViewBox,
    setScale,
    setStdScale,
    clearComponent,
  } = useBlueprintStore((state) => state.CommonAction);
  const { setLineDrawingMode } = useBlueprintStore((state) => state.LineAction);
  const {} = useBlueprintStore((state) => state.AreaAction);

  // @ts-ignore
  const handleScaleChange = (e) => {
    setScale(e.instance.transformState.scale);
  };

  useEffect(() => {
    const escKeyInput = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLineDrawingMode(false);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        clearComponent();
      }
    };
    const handleResize = () => {
      const component = document.querySelector('.grid-wrapper')!;
      const box = component.getBoundingClientRect();
      setBlueprintSrc(box.x, box.y);
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

  useEffect(() => {
    const component = document.getElementById('background');
    if (component !== null) {
      setStdScale();
      setGridSrc();
    }
  }, [viewBox]);
  return (
    <div className='grid-wrapper w-full h-full overflow-hidden'>
      <ExportButton />
      {selectedServiceId && !isMoving && (
        <>
          {/*<Options serviceType={services[selectedServiceId].type} />*/}
          <CreateLineContainer x={lineDrawingLocation.x} y={lineDrawingLocation.y} />
        </>
      )}
      <TransformWrapper
        minScale={0.5}
        initialScale={1}
        maxScale={10}
        defaultScale={1}
        doubleClick={{ disabled: true }}
        onTransformed={(e: any) => {
          setGridSrc();
          handleScaleChange(e);
        }}
      >
        <TransformComponent>
          {viewBox.width !== 0 ? (
            <div id='blueprint'>
              <svg
                width={viewBox.width}
                height={viewBox.height}
                // TODO: 어떤 값으로 둘지?
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
                    <pattern id='grayPattern' width='80' height='80' patternUnits='userSpaceOnUse'>
                      <path d='M -40 40 L 120 40' stroke='gray' strokeWidth='1' />
                      <path d='M 40 -40 L 40 120' stroke='gray' strokeWidth='1' />
                    </pattern>
                    <pattern id='boldPattern' width='80' height='80' patternUnits='userSpaceOnUse'>
                      <path d='M 0 0 L 80 0 80 80 0 80 z' stroke='black' strokeWidth='1.5' fill='none' />
                    </pattern>
                  </defs>
                  <rect fill='url(#boldPattern)' width={1040} height={1360} className='cursor-move' />
                  <rect fill='url(#grayPattern)' width={1040} height={1360} className='cursor-move' />
                </g>
                <g id='zone'>
                  {Object.keys(areas).map((key) => (
                    <AZ key={areas[key].id} Area={areas[key]} activate={selectedAreaId === areas[key].id} />
                  ))}
                </g>
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
                      onMouseLeave={(e) => {
                        e.stopPropagation();
                        onMouseLeaveService(e, services[key]);
                      }}
                      key={services[key].id}
                      isActive={services[key].id === selectedServiceId}
                      x={services[key].x}
                      y={services[key].y}
                      id={services[key].id}
                      type={services[key].type}
                      lines={services[key].lines}
                      linkedPoints={services[key].linkedPoints}
                    />
                  ))}
                </g>
                {Object.keys(lines).map((key) => {
                  // console.log(circles[lines[key].srcId]);
                  // console.log(circles[lines[key].dstId]);
                  return (
                    <line
                      key={key}
                      x1={circles[lines[key].srcId].x}
                      y1={circles[lines[key].srcId].y}
                      x2={circles[lines[key].dstId].x}
                      y2={circles[lines[key].dstId].y}
                      stroke={'black'}
                    />
                  );
                })}
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
