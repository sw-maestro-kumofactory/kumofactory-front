'use client';
import { useState } from 'react';
import Link from 'next/link';

import Blueprint from '@/public/blueprint.svg';

interface IProps {
  name: string;
  index: number;
  id: string;
  svg?: string;
}

const Card = ({ index, id, name }: IProps) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className='w-1/3 h-2/5 p-4'>
      <div
        className='ImageWrapper w-full h-5/6 relative rounded-2xl'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 '>
            <Link
              className='flex justify-center items-center bg-black text-white h-10 rounded-xl mb-4'
              href={`/blueprint/${id}`}
            >
              Load
            </Link>
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
          {isHover && <rect width='100%' height='100%' className='fill-blue-950 opacity-50' />}
        </svg>
      </div>
      <div className='mt-2'>{name}</div>
    </div>
  );
};

export default Card;
