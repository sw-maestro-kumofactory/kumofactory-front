'use client';
import { useEffect, useRef } from 'react';
import { IComponent, ServicesString } from '@/src/types/Services';
import { serviceSvg } from '@/src/assets/Svg';

interface IProps extends IComponent {
  onMouseDown?: (e: any) => void;
  onClick?: (e: any) => void;
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
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      width='90'
      height='90'
      cursor='pointer'
      viewBox='0 0 90 90'
      xmlns='http://www.w3.org/2000/svg'
      ref={svgRef}
      className='service-svg animate-service'
    >
      {serviceSvg[props.type]}
      {/* 활성화 시 테두리 나타나게 */}
      {props.isActive && (
        <path d='M0 0 L 0 90 L 90 90 L 90 0z' stroke='#195091' fill='transparent' fillOpacity='0.1' strokeWidth='4' />
      )}
    </svg>
  );
};

export default Service;
