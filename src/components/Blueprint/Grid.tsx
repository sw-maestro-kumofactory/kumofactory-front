'use client';
import EC2 from '@/src/components/AWSService/EC2';
import useServiceStore from '@/src/hooks/useServiceStore';
import { useEffect, useState } from 'react';
import Loading from '@/src/components/common/Loading';

interface IViewBox {
  width: number;
  height: number;
}

const Grid = () => {
  const {
    services,
    selectedServiceId,
    onClickGrid,
    clearService,
    onMouseDownService,
    onMouseUpService,
    onMouseMoveService,
  } = useServiceStore();

  const [viewBox, setViewBox] = useState<IViewBox | null>(null);

  // ESC to remove service
  useEffect(() => {
    const escKeyInput = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearService();
      }
    };
    window.addEventListener('keydown', escKeyInput);
    return () => {
      window.removeEventListener('keydown', escKeyInput);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const component = document.querySelector('.grid-wrapper');
      const { width, height } = component?.getBoundingClientRect() || { width: 0, height: 0 };
      setViewBox({ width, height });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='grid-wrapper w-full h-full overflow-hidden '>
      {viewBox ? (
        <svg
          width='100%'
          height='100%'
          viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
          onClick={onClickGrid}
          onMouseUp={onMouseUpService}
          onMouseMove={(e: React.MouseEvent) => onMouseMoveService(e)}
        >
          <svg>
            <defs>
              <pattern id='grayPattern' width='90' height='90' patternUnits='userSpaceOnUse'>
                <path d='M -45 45 L 135 45' stroke='gray' strokeWidth='1' />
                <path d='M 45 -45 L 45 135' stroke='gray' strokeWidth='1' />
              </pattern>
              <pattern id='boldPattern' width='90' height='90' patternUnits='userSpaceOnUse'>
                <path d='M 0 0 L 90 0 90 90 0 90 z' stroke='black' strokeWidth='1' fill='none' />
              </pattern>
            </defs>
            <rect fill='url(#boldPattern)' width={viewBox.width} height={viewBox.height} />
            <rect fill='url(#grayPattern)' width={viewBox.width} height={viewBox.height} />
          </svg>
          {services.map((service) => (
            <EC2
              onClick={(e) => {
                e.stopPropagation();
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                onMouseDownService(e, service);
              }}
              key={service.id}
              isActive={service.id === selectedServiceId}
              id={service.id}
              x={service.x}
              y={service.y}
              type={'ec2'}
            />
          ))}
        </svg>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Grid;
