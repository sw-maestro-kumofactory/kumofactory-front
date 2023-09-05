'use client';
import { useEffect, useState } from 'react';

import Service from '@/src/components/AWSService/Service';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import Loading from '@/src/components/common/Loading';
import Area from '@/src/components/AWSService/Area/Area';
import CreateLineContainer from '@/src/components/Blueprint/FloatingButton/CreateLine/CreateLineContainer';
import { useSetTemplate } from '@/src/hooks/useSetTemplate';
import OptionContainer from '@/src/components/AWSService/Options/OptionContainer';
import { AreaTypes, IArea } from '@/src/types/Area';
import DeployButton from '@/src/components/Blueprint/FloatingButton/DeployButton';

interface IProps {
  id: string;
}

const Grid = ({ id }: IProps) => {
  const areas = useBlueprintStore((state) => state.areas[id]);
  const services = useBlueprintStore((state) => state.services[id]);
  const selectedAreaId = useBlueprintStore((state) => state.selectedAreaId);
  const selectedServiceId = useBlueprintStore((state) => state.selectedServiceId);
  const isMoving = useBlueprintStore((state) => state.isMoving);
  const viewBox = useBlueprintStore((state) => state.viewBox);
  const lines = useBlueprintStore((state) => state.lines[id]);
  const selectedLineId = useBlueprintStore((state) => state.selectedLineId);
  const lineDrawingMode = useBlueprintStore((state) => state.isLineDrawing);
  const isShowOption = useBlueprintStore((state) => state.isShowOption);
  const doubleClickedServiceId = useBlueprintStore((state) => state.doubleClickedServiceId);
  const { onMouseDownService, onMouseEnterService, onMouseLeaveService, onDoubleClickService } = useBlueprintStore(
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
    setBlueprintId,
    setIsTemplateOpen,
  } = useBlueprintStore((state) => state.CommonAction);
  const { setLineDrawingMode, onClickLine } = useBlueprintStore((state) => state.LineAction);
  const { isLoading, setIsLoading, setTemplate } = useSetTemplate();
  const [sortedAreas, setSortedAreas] = useState<IArea[]>([]);

  const typeOrder: AreaTypes[] = ['VPC', 'AZ', 'SUBNET'];

  const onHandleMouseMove = (e: React.MouseEvent) => {
    if (selectedServiceId) e.stopPropagation();
    onMouseMove(e);
  };

  const handleResize = () => {
    const component = document.querySelector('.grid-wrapper')!;
    const box = component.getBoundingClientRect();
    setBlueprintSrc(box.x, box.y);
    const { width, height } = component?.getBoundingClientRect() || { width: 0, height: 0 };
    setViewBox(width, height);
  };

  const onKeyDownESC = (e: KeyboardEvent) => {
    e.stopPropagation();

    const isSvgTestElement = (e.target as HTMLElement).classList.contains('test');

    if (e.key === 'Escape' && isSvgTestElement) {
      setLineDrawingMode(false);
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      clearComponent();
    }
  };

  useEffect(() => {
    setBlueprintId(id);
  }, []);

  useEffect(() => {
    if (areas) {
      const sortedAreas = typeOrder.flatMap((type) => Object.values(areas).filter((area) => area.type === type));
      setSortedAreas(sortedAreas);
    }
  }, [areas]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', onKeyDownESC);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDownESC);
    };
  }, []);

  useEffect(() => {
    const component = document.getElementById('background');
    if (component !== null) {
      setGridSrc();
    }
  }, [isLoading, viewBox]);

  useEffect(() => {
    handleResize();
  }, [isShowOption]);

  return (
    <div
      className='grid-wrapper w-full h-full overflow-hidden'
      onClick={(e) => {
        e.stopPropagation();
        setIsEdit(false);
      }}
    >
      <DeployButton />
      {viewBox.width !== 0 && !isLoading ? (
        <div id='blueprint'>
          <svg
            className={'testA'}
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
              {sortedAreas.map((area) => (
                <Area
                  key={area.id}
                  area={area}
                  activate={selectedAreaId === area.id}
                  styleKey={area.type === 'SUBNET' ? area.scope! : area.type}
                />
              ))}
            </g>
            <g id='lines'>
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
                      e.stopPropagation();
                      onClickLine(selectedLineId === key ? null : key);
                    }}
                    strokeWidth={2}
                    stroke={selectedLineId === key ? 'red' : '#595959'}
                  />
                );
              })}
            </g>
            <g id='services'>
              {Object.keys(services).map((key) => {
                const serviceName = services[key].type;

                const serviceNameWidth = serviceName.length * 13;
                const xAdjustment = (90 - serviceNameWidth) / 2;
                return (
                  <g key={services[key].id}>
                    <Service
                      onClick={(e) => {
                        e.stopPropagation();
                        onDoubleClickService(e, services[key]);
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
                      options={{}}
                    />
                    {selectedServiceId === services[key].id && !isMoving && !lineDrawingMode && (
                      <foreignObject x={services[key].x + 90} y={services[key].y + 15} width={50} height={50}>
                        <CreateLineContainer />
                      </foreignObject>
                    )}
                    <foreignObject
                      x={services[key].x + xAdjustment}
                      y={services[key].y + 80}
                      width={serviceNameWidth.toString()}
                      height='21'
                    >
                      <div className='flex justify-center items-center select-none w-fit '>{services[key].type}</div>
                    </foreignObject>
                  </g>
                );
              })}
            </g>
          </svg>
          {isShowOption && doubleClickedServiceId && (
            <OptionContainer id={doubleClickedServiceId} type={services[doubleClickedServiceId].type} />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default Grid;
