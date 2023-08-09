'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Blueprint from '@/public/blueprint.svg';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { useSetTemplate } from '@/src/hooks/useSetTemplate';
import { getTemplateListById } from '@/src/api/template';

interface IProps {
  name: string;
  index: number;
  id: string;
  svg?: string;
}

const Card = ({ index, id, name }: IProps) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const { setTemplate } = useSetTemplate();

  const onClick = async (id: string) => {
    try {
      // 이미 있으면, 어떻게 요청 보내지 않기로
      const data = await getTemplateListById(id);
      setTemplate({ data: data });
      router.push(`/blueprint/${id}`);
    } catch (e) {
      console.log(e);
      alert('asdf');
    }
  };

  return (
    <div className='w-1/3 h-2/5 p-4'>
      <div
        className='ImageWrapper w-full h-5/6 relative rounded-2xl'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '>
            <div
              className='flex justify-center items-center bg-black text-white h-10 rounded-xl mb-4'
              onClick={() => onClick(id)}
            >
              Load
            </div>
            <Link
              className='flex justify-center items-center w-40 h-10 text-white border-white border-2 rounded-xl'
              href={`/blueprint/${id}`}
            >
              Settings
            </Link>
          </div>
        )}
        <svg className='w-full h-full border-gray-300 border-solid border-2 rounded-2xl'>
          <Blueprint />
          {/* load svg from url or png */}
          {isHover && <rect width='100%' height='100%' className='fill-blue-950 opacity-50' />}
        </svg>
      </div>
      <div className='mt-2'>{name}</div>
    </div>
  );
};

export default Card;
