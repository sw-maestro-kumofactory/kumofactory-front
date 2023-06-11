'use client';
import { useEffect, useRef } from 'react';
import { IService } from '@/src/types';
import Ec2 from 'assets/ec2.svg';
interface IProps extends IService {
  onClick?: (e: any) => void;
  onMouseDown?: (e: any) => void;
  onMouseUp?: (e: any) => void;
  isActive: boolean;
}

const Instance = (props: IProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.setAttribute('x', props.x.toString());
      svgRef.current.setAttribute('y', props.y.toString());
    }
  }, [props.x, props.y]);

  return (
    <svg
      // onClick={props.onClick}
      // onMouseDown={props.onMouseDown}
      // onMouseUp={props.onMouseUp}
      width='90'
      height='90'
      cursor='pointer'
      viewBox='0 0 70 70'
      xmlns='http://www.w3.org/2000/svg'
      ref={svgRef}
    >
      <g fill={props.isActive ? '#F7981F' : '#123456'}>
        <rect x={props.x} y={props.y} width='90' height='90' fill='transparent' />
        <path d='M30.879 61.843a3.003 3.003 0 0 0 3.002 3.002h27.436a3.003 3.003 0 0 0 3.002-3.002V33.738a3.002 3.002 0 0 0-3.002-3.002H33.881a3.003 3.003 0 0 0-3.002 3.002v28.105z' />
        <path d='M28.232 31.124a3.003 3.003 0 0 1 3.002-3.002H51.8v-7.145a3.002 3.002 0 0 0-3.001-3.002H21.365a3.002 3.002 0 0 0-3.002 3.002v28.104a3.002 3.002 0 0 0 3.002 3.002h6.867V31.124z' />
        <path d='M15.87 18.427a3.002 3.002 0 0 1 3.002-3.002h20.566V8.28a3.003 3.003 0 0 0-3.002-3.002H9.002A3.002 3.002 0 0 0 6 8.28v28.105a3.003 3.003 0 0 0 3.002 3.002h6.868v-20.96z' />
      </g>
    </svg>
  );
};

export default Instance;
