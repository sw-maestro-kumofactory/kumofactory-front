'use client';
import EC2 from '@/src/components/AWSService/EC2';
import { useCounter } from '@/src/store/useCounter';
import useServiceStore from '@/src/hooks/useServiceStore';
import { useEffect } from 'react';

interface GridProps {
  children?: React.ReactNode;
}

const Grid = ({ children }: GridProps) => {
  const { services, onClickService, selectedServiceId, removeService, clearService } = useServiceStore();

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

  return (
    <div className='w-full h-full overflow-hidden'>
      <svg width='100%' height='100%' viewBox='0 0 1440 990'>
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
          <rect fill='url(#boldPattern)' width='1440' height='990' />
          <rect fill='url(#grayPattern)' width='1440' height='990' />
        </svg>
        {services.map((service) => (
          <EC2
            onClick={() => {
              onClickService(service);
            }}
            key={service.id}
            isActive={service.id === selectedServiceId}
            id={service.id}
            x={service.x}
            y={service.y}
            type={'ec2'}
          />
        ))}
        {children}
      </svg>
    </div>
  );
};

export default Grid;
