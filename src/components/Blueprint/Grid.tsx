'use client';
import { useEffect } from 'react';
import axios from 'axios';

import Service from '@/src/components/AWSService/Service';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import Loading from '@/src/components/common/Loading';
import Area from '@/src/components/AWSService/Area/Area';
import CreateLineContainer from '@/src/components/Blueprint/FloatingButton/CreateLine/CreateLineContainer';
import BlueprintNameField from '@/src/components/Blueprint/BlueprintNameField';
import { useSetTemplate } from '@/src/hooks/useSetTemplate';
import { getTemplateList, getTemplateListById, postTemplateData } from '@/src/api/template';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import { EC2OptionComponent } from '@/src/components/AWSService/OptionFactory/Options/EC2Option';
import OptionContainer from '@/src/components/AWSService/Options/OptionContainer';
import { AreaTypes, IArea } from '@/src/types/Area';

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
  } = useBlueprintStore((state) => state.CommonAction);
  const { setLineDrawingMode, onClickLine } = useBlueprintStore((state) => state.LineAction);
  const { isLoading, setIsLoading, setTemplate } = useSetTemplate();

  const typeOrder: AreaTypes[] = ['VPC', 'AZ', 'Subnet'];

  const sortedAreas = typeOrder.flatMap((type) => Object.values(areas).filter((area) => area.type === type));

  const onHandleMouseMove = (e: React.MouseEvent) => {
    if (selectedServiceId) e.stopPropagation();
    onMouseMove(e);
  };

  const setTemplateById = async (id: number) => {
    // const data = await getTemplateListById(id);
    // console.log(data);
    const data = await axios.get('/apiTest/blueprint');
    setTemplate({ data: data.data });
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

    // Check if the current target (element that triggered the event) has the className "testA"
    const isSvgTestElement = (e.target as HTMLElement).classList.contains('test');

    if (e.key === 'Escape' && isSvgTestElement) {
      setLineDrawingMode(false);
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      clearComponent();
    }
  };

  useEffect(() => {
    // 초기화 되는걸 막기 위해서
    if (!services) {
      if (id !== 'empty') {
        setTemplateById(1);
      } else {
        setTemplate({
          data: {
            name: '',
            uuid: '',
            components: [],
            links: [],
            areas: [],
          },
        });
      }
    }
    setIsLoading(false);
  }, []);

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
      {!isLoading && <BlueprintNameField />}
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
                  styleKey={area.type === 'Subnet' ? area.scope! : area.type}
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
              {Object.keys(services).map((key) => (
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
                    option={{}}
                  />
                  {selectedServiceId === services[key].id && !isMoving && !lineDrawingMode && (
                    <foreignObject x={services[key].x + 90} y={services[key].y + 15} width={50} height={50}>
                      <CreateLineContainer />
                    </foreignObject>
                  )}
                  <foreignObject x={services[key].x - 40} y={services[key].y + 80} width={160} height={24}>
                    <div className='flex justify-center select-none'>{services[key].type}</div>
                  </foreignObject>
                </g>
              ))}
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
