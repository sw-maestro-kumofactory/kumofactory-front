'use client';
import { useEffect, useRef } from 'react';

import { IComponent, ServicesString } from '@/src/types/Services';
import { ServiceFactory } from '@/src/components/AWSService/ServiceFactory/ServiceFactory';
import { ServiceFactoryInstance } from '@/src/components/AWSService/ServiceFactory/ServiceFactory';

interface IProps extends IComponent {
  onMouseDown: (e: any) => void;
  onMouseEnter: (e: any) => void;
  onMouseLeave: (e: any) => void;
  onClick: (e: any) => void;
  type: ServicesString;
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
      ref={svgRef}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      cursor='pointer'
    >
      {ServiceFactoryInstance.getSvg({ type: props.type })}
      {props.isActive && (
        <path d='M1 1 L 1 79 L 79 79 L 79 1z' stroke='#19509155' fill='transparent' fillOpacity='0.5' strokeWidth='3' />
      )}
    </svg>
  );
};

export default Service;
