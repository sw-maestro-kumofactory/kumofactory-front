'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons/faCopy';
import { faAws } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons/faGlobe';

import { BlueprintInfo } from '@/src/types/Blueprint';

interface IProps {
  data: BlueprintInfo;
  onClick: () => void;
  onClickLoad: (e: any, id: string) => void;
  thumbnail: string;
}

const TemplateCard = ({ data, onClick, thumbnail, onClickLoad }: IProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className='w-1/3 h-[290px] p-4'>
      <div
        className='relative w-full h-[250px] border-2 border-solid border-gray-400 rounded-md'
        onClick={onClick}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover ? (
          <FontAwesomeIcon
            icon={faCopy}
            className='absolute bottom-16 left-2 p-2 cursor-pointer bg-[#6e58f6] rounded-lg text-white hover:animate-shift-bottom'
            onClick={(e) => onClickLoad(e, data.uuid)}
          />
        ) : null}
        <div className='w-full h-[190px]'>
          <svg className='w-full h-full rounded-t-lg '>
            <g dangerouslySetInnerHTML={{ __html: thumbnail }} />
          </svg>
        </div>
        <hr />
        <div className='w-full h-[60px] p-[10px]'>
          <div className='flex justify-between items-center text-sm'>
            <div className='flex flex-col'>
              <div>{data.name}</div>
              <div className='text-xs text-gray-600'>Kumo factory</div>
            </div>
            <div className='flex items-center pr-2 text-gray-400'>
              <FontAwesomeIcon className='pr-2 cursor-pointer' icon={faCopy} />
              <div>{data.downloadCount}</div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[40px] p-3 flex gap-x-2 '>
        {/*@ts-ignore*/}
        <FontAwesomeIcon icon={faAws} />
        <FontAwesomeIcon icon={faGlobe} />
      </div>
    </div>
  );
};

export default TemplateCard;
