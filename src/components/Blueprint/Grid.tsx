'use client';
import { useEffect } from 'react';
import axios from 'axios';

import Service from '@/src/components/AWSService/Service';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import Loading from '@/src/components/common/Loading';
import AZ from '@/src/components/AWSService/Area/AZ';
import CreateLineContainer from '@/src/components/Blueprint/FloatingButton/CreateLine/CreateLineContainer';
import BlueprintNameField from '@/src/components/Blueprint/BlueprintNameField';
import { useSetTemplate } from '@/src/hooks/useSetTemplate';

interface IProps {
  id: string;
}
const Grid = ({ id }: IProps) => {
  const areas = useBlueprintStore((state) => state.areas);
  const selectedAreaId = useBlueprintStore((state) => state.selectedAreaId);
  const services = useBlueprintStore((state) => state.services);
  const selectedServiceId = useBlueprintStore((state) => state.selectedServiceId);
  const isMoving = useBlueprintStore((state) => state.isMoving);
  const viewBox = useBlueprintStore((state) => state.viewBox);
  const lines = useBlueprintStore((state) => state.lines);
  const selectedLineId = useBlueprintStore((state) => state.selectedLineId);
  const lineDrawingMode = useBlueprintStore((state) => state.isLineDrawing);
  const viewBoxOriginSize = useBlueprintStore((state) => state.viewBoxOriginSize);
  const scale = useBlueprintStore((state) => state.scale);
  const { onMouseDownService, onMouseEnterService, onMouseLeaveService } = useBlueprintStore(
    (state) => state.ServiceAction,
  );
  const {
    onClickGrid,
    onMouseUp,
    onMouseMove,
    onMouseDown,
    onMouseWheel,
    setGridSrc,
    setBlueprintSrc,
    setViewBox,
    clearComponent,
    setIsEdit,
  } = useBlueprintStore((state) => state.CommonAction);
  const { setLineDrawingMode, onClickLine } = useBlueprintStore((state) => state.LineAction);
  const { isLoading, setIsLoading, setTemplate } = useSetTemplate();

  console.log(viewBox.x, viewBox.y, viewBox.width, viewBox.height);
  console.log('scale: ', scale);

  const onHandleMouseMove = (e: React.MouseEvent) => {
    if (selectedServiceId) e.stopPropagation();
    onMouseMove(e);
  };

  useEffect(() => {
    if (id !== 'empty') {
      axios.get('/apiTest').then((res) => {
        setTemplate({ data: res.data });
      });
    } else {
      setTemplate({
        data: {
          name: '',
          components: [],
          links: [],
        },
      });
    }
    setIsLoading(false);
  }, []);

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
      setGridSrc();
    }
  }, [isLoading, viewBox]);

  return (
    <div
      className='grid-wrapper w-full h-full overflow-hidden'
      onClick={(e) => {
        e.stopPropagation();
        setIsEdit(false);
      }}
    >
      {!isLoading && <BlueprintNameField />}
      {viewBox.width !== 0 && !isLoading ? (
        <div id='blueprint'>
          <svg
            className={'test'}
            width='100%'
            height='100%'
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            onClick={onClickGrid}
            onMouseUp={onMouseUp}
            onMouseMove={onHandleMouseMove}
            onMouseDown={onMouseDown}
            onWheel={onMouseWheel}
            xmlns='http://www.w3.org/2000/svg'
          >
            <g id='background'>
              <defs>
                <pattern id='dottedPattern' width='20' height='20' patternUnits='userSpaceOnUse'>
                  <circle cx='1' cy='1' r='1' fill='gray' />
                </pattern>
              </defs>
              <rect
                fill='url(#dottedPattern)'
                x={viewBox.x}
                y={viewBox.y}
                width='100%'
                height='100%'
                className='cursor-move'
              />
            </g>
            <g id='zone'>
              {Object.keys(areas).map((key) => (
                <AZ key={areas[key].id} Area={areas[key]} activate={selectedAreaId === areas[key].id} />
              ))}
            </g>
            <g id={'lines'}>
              {Object.keys(lines).map((key) => {
                return (
                  <line
                    key={key}
                    id={key}
                    x1={lines[key].src.x}
                    y1={lines[key].src.y}
                    x2={lines[key].dst.x}
                    y2={lines[key].dst.y}
                    onClick={(e) => {
                      onClickLine(selectedLineId === key ? null : key);
                    }}
                    strokeWidth={2}
                    stroke={selectedLineId === key ? 'red' : 'black'}
                  />
                );
              })}
            </g>
            <g id='services'>
              {Object.keys(services).map((key) => (
                <g key={services[key].id}>
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
                  />
                  {selectedServiceId === services[key].id && !isMoving && !lineDrawingMode && (
                    <foreignObject x={services[key].x + 90} y={services[key].y + 15} width={50} height={200}>
                      <CreateLineContainer />
                    </foreignObject>
                  )}
                </g>
              ))}
            </g>
          </svg>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default Grid;
