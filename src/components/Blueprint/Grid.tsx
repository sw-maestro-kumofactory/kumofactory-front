'use client';
import Service from '@/src/components/AWSService/Service';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { useEffect, useState } from 'react';
import Loading from '@/src/components/common/Loading';
import Options from '@/src/components/AWSService/Option/Options';
import { ExportButton } from '@/src/components/Blueprint/FloatingButton/ExportButton';
import AZ from '@/src/components/Blueprint/Area/AZ';

interface IViewBox {
  width: number;
  height: number;
}

const Grid = () => {
  const [viewBox, setViewBox] = useState<IViewBox | null>(null);
  const { onClickGrid, onMouseUp, onMouseMove, setGridSrc } = useBlueprintStore((state) => state.CommonAction);
  const areas = useBlueprintStore((state) => state.areas);
  const selectedArea = useBlueprintStore((state) => state.selectedArea);
  const services = useBlueprintStore((state) => state.services);
  const selectedService = useBlueprintStore((state) => state.selectedService);
  const { onMouseDownService } = useBlueprintStore((state) => state.ServiceAction);
  const {} = useBlueprintStore((state) => state.AreaAction);
  // ESC to remove service
  // useEffect(() => {
  //   const escKeyInput = (e: KeyboardEvent) => {
  //     if (e.key === 'Escape') {
  //       removeService();
  //     }
  //   };
  //   window.addEventListener('keydown', escKeyInput);
  //   return () => {
  //     window.removeEventListener('keydown', escKeyInput);
  //   };
  // }, []);

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
                  key={services[key].id}
                  isActive={services[key].id === selectedService?.id}
                  id={services[key].id}
                  x={services[key].x}
                  y={services[key].y}
                  type={services[key].type}
                />
              ))}
            </g>
          </svg>
        </div>
      ) : (
        <Loading />
      )}
      {selectedService && <Options service={selectedService} />}
    </div>
  );
};

export default Grid;
