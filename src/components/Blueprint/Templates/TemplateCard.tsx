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
    <div className='w-[290px] h-[218px]'>
      <div
        className='relative w-full h-[250px]'
        onClick={onClick}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div>
          {isHover && (
            <FontAwesomeIcon
              icon={faCopy}
              className='absolute bottom-[82px] left-2 p-2 cursor-pointer bg-[#6e58f6] rounded-lg text-white hover:animate-shift-bottom'
              onClick={(e) => onClickLoad(e, data.uuid)}
            />
          )}
          <div className='w-full h-[174px] border rounded-md hover:shadow-md'>
            <svg className='w-full h-full rounded-t-lg'>
              {/*<g dangerouslySetInnerHTML={{ __html: thumbnail }} />*/}
            </svg>
          </div>
          <div className='absolute bottom-[74px] right-2 h-[30px] p-[2px] flex gap-x-2 '>
            {/*@ts-ignore*/}
            <FontAwesomeIcon icon={faAws} />
            <FontAwesomeIcon icon={faGlobe} />
          </div>
        </div>
        <div className='w-full h-[60px] mt-[10px]' onClick={(e) => e.stopPropagation()}>
          <div className='flex justify-between items-center text-sm'>
            <div className='w-8 min-w-[32px] h-8 bg-gray-500 rounded-full mr-2'></div>
            <div className='flex flex-col w-full'>
              <div className='w-full flex justify-between'>
                <div className='text-[13px] text-[#323438] cursor-pointer' onClick={onClick}>
                  {data.name}
                </div>
                <div className='flex items-center pr-2 text-gray-400'>
                  <FontAwesomeIcon className='pr-2 cursor-pointer' icon={faCopy} />
                  <div>{data.downloadCount}</div>
                </div>
              </div>
              <div className='text-[10px] text-[#A5B0B9]'>{data.username}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
