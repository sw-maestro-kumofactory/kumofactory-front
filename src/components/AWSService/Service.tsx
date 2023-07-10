'use client';
import { useEffect, useRef } from 'react';

import { IComponent, ServicesString } from '@/src/types/Services';
import { ServiceFactory } from '@/src/components/AWSService/ServiceFactory/ServiceFactory';

interface IProps extends IComponent {
  onMouseDown: (e: any) => void;
  onMouseEnter: (e: any) => void;
  onClick: (e: any) => void;
  type: ServicesString;
  isActive: boolean;
}

const Service = (props: IProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const serviceFactory = new ServiceFactory();

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.setAttribute('x', props.x.toString());
      svgRef.current.setAttribute('y', props.y.toString());
    }
  }, [props.x, props.y]);
  return (
    <svg
      ref={svgRef}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseEnter={props.onMouseEnter}
      cursor='pointer'
    >
      {serviceFactory.getSvg({ type: props.type })}
      {props.isActive && (
        <path d='M0 0 L 0 80 L 80 80 L 80 0z' stroke='#195091' fill='transparent' fillOpacity='0.1' strokeWidth='4' />
      )}
    </svg>
  );
};

export default Service;
