'use client';
import { useEffect, useRef } from 'react';
import { IService } from '@/src/types';
import Ec2 from 'assets/ec2.svg';
import { getService } from '@/src/components/AWSService/constants';
interface IProps extends IService {
  onMouseDown?: (e: any) => void;
  onClick?: (e: any) => void;
  type: string;
  isActive: boolean;
}

const Service = (props: IProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.setAttribute('x', props.x.toString());
      svgRef.current.setAttribute('y', props.y.toString());
    }
  }, [props.x, props.y]);

  return (
    <svg
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      width='90'
      height='90'
      cursor='pointer'
      viewBox='0 0 90 90'
      xmlns='http://www.w3.org/2000/svg'
      ref={svgRef}
    >
      {getService(props.type)}
      {props.isActive && (
        <path d='M0 0 L 0 90 L 90 90 L 90 0z' stroke='#195091' fill='#195091' fillOpacity='0.2' strokeWidth='2' />
      )}
    </svg>
  );
};

export default Service;
