'use client';
import { useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import axios from 'axios';

import Service from '@/src/components/AWSService/Service';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import Loading from '@/src/components/common/Loading';
import { ExportButton } from '@/src/components/Blueprint/FloatingButton/Export/ExportButton';
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
  const lineDrawingMode = useBlueprintStore((state) => state.lineDrawingMode);
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
    blueprintToJson,
    setIsEdit,
  } = useBlueprintStore((state) => state.CommonAction);
  const { setLineDrawingMode } = useBlueprintStore((state) => state.LineAction);
  const { isLoading, setIsLoading, setTemplate } = useSetTemplate();
  // @ts-ignore
  const handleScaleChange = (e) => {
    setScale(e.instance.transformState.scale);
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
      setStdScale();
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
      <ExportButton />
      <BlueprintNameField />
      <div className='absolute right-40 top-28 select-none z-10'>
        <button
          onClick={() => {
            // const d = postTemplateData(blueprintToJson());
            console.log(blueprintToJson());
          }}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Send
        </button>
        <input type='file' id='fileInput' className='hidden' />
      </div>
      <TransformWrapper
        minScale={0.5}
        initialScale={1}
        maxScale={10}
        doubleClick={{ disabled: true }}
        onTransformed={(e: any) => {
          setGridSrc();
          handleScaleChange(e);
        }}
      >
        <TransformComponent>
          {viewBox.width !== 0 && !isLoading ? (
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
                    <pattern id='dottedPattern' width='20' height='20' patternUnits='userSpaceOnUse'>
                      <circle cx='1' cy='1' r='1' fill='gray' />
                    </pattern>
                  </defs>
                  <rect fill='url(#dottedPattern)' width={1040} height={1360} className='cursor-move' />
                </g>
                <g id='zone'>
                  {Object.keys(areas).map((key) => (
                    <AZ key={areas[key].id} Area={areas[key]} activate={selectedAreaId === areas[key].id} />
                  ))}
                </g>
                {Object.keys(lines).map((key) => {
                  return (
                    <line
                      key={key}
                      id={key}
                      x1={lines[key].src.x}
                      y1={lines[key].src.y}
                      x2={lines[key].dst.x}
                      y2={lines[key].dst.y}
                      strokeWidth={2}
                      stroke={'black'}
                    />
                  );
                })}
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
                        <foreignObject x={services[key].x + 90} y={services[key].y - 15} width={50} height={200}>
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
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
export default Grid;
