'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons/faCopy';
import { faAws } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import { BlueprintInfo } from '@/src/types/Blueprint';

interface IProps {
  data: BlueprintInfo;
  onClick: () => void;
  onClickLoad: (e: any, id: string, isTemplate: boolean) => void;
  thumbnail?: string;
  image?: string;
}

const TemplateCard = ({ data, onClick, thumbnail, image, onClickLoad }: IProps) => {
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
          <div className='absolute bottom-[82px] left-1.5 p-2 w-7 h-7 cursor-pointer text-[#323438] bg-white border border-[#DAE2EC] rounded-md hover:animate-shift-bottom flex items-center justify-center z-20'>
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className='w-3 h-3'
              onClick={(e) => {
                e.stopPropagation();
                onClickLoad(e, data.uuid, data.username === 'KumoFactory');
              }}
            />
          </div>
          <div className='w-full h-[174px] border rounded-md hover:shadow-md drop-shadow	'>
            {thumbnail !== undefined && (
              <svg className='w-full h-full rounded-t-lg'>
                <g dangerouslySetInnerHTML={{ __html: thumbnail }} />
              </svg>
            )}
            {image !== undefined && <Image className='rounded-md' src={image} fill={true} alt='template image' />}
          </div>
          <div className='absolute bottom-[78px] right-[3px] h-[30px] gap-x-2 bg-white p-1 flex justify-center items-center'>
            {/* @ts-ignore */}
            <FontAwesomeIcon icon={faAws} />
            {data.scope === 'PUBLIC' && (
              <Image width={20} height={20} src={'/icons/Design/public.svg'} alt={'public'} />
            )}
            {data.scope === 'KUMOFACTORY' && (
              <Image width={20} height={20} src={'/icons/Design/logo.svg'} alt={'kumo'} />
            )}
          </div>
        </div>
        <div className='w-full h-[60px] mt-[10px]' onClick={(e) => e.stopPropagation()}>
          <div className='flex justify-between items-center text-sm'>
            {/* avatar is here */}
            <div className='w-8 min-w-[32px] h-8 rounded-full mr-2 flex justify-center items-start'>
              {data.username === 'KumoFactory' ? (
                <Image width={20} height={20} src={'/icons/Design/logo.svg'} alt={'kumo'} />
              ) : (
                <img
                  src={`https://github.com/${data.username}.png`}
                  className='rounded-full w-8 h-8'
                  alt={'GRAVATAR'}
                />
              )}
            </div>
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
