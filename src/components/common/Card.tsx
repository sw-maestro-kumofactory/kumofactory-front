import { useEffect, useState } from 'react';
import Link from 'next/link';

import { commonAxiosInstance } from '@/src/api';

interface CardProps {
  index: number;
  id: string;
  name: string;
  svg: string;
}

const Card = ({ index, id, name, svg }: CardProps) => {
  const [isHover, setIsHover] = useState(false);
  const [svgData, setSvgData] = useState<string>('');

  const fetchSvgData = async () => {
    try {
      const urlParts = svg.split('/');
      const url = `/svg/${urlParts[3]}/${urlParts[4]}`;
      const response = await commonAxiosInstance.get(url);
      setSvgData(response.data);
    } catch (error) {
      console.error('Error fetching SVG data:', error);
    }
  };

  useEffect(() => {
    fetchSvgData();
  }, []);

  return (
    <div className='w-1/3 h-2/5 p-4'>
      <div
        className='ImageWrapper w-full h-5/6 relative rounded-2xl'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Link href={`/blueprint/${id}`}>
              <div className='flex justify-center items-center bg-black text-white h-10 rounded-xl mb-4'>
                Load Blueprint
              </div>
            </Link>
            <Link href={`/blueprint/${id}/deploy`}>
              <div className='flex justify-center items-center w-40 h-10 text-white border-white border-2 rounded-xl'>
                Application Deploy
              </div>
            </Link>
          </div>
        )}
        <svg className='w-full h-full border-gray-300 border-solid border-2 rounded-2xl'>
          {svgData && <g dangerouslySetInnerHTML={{ __html: svgData }} />}
          {isHover && <rect width='100%' height='100%' className='fill-blue-950 opacity-50' />}
        </svg>
      </div>
      <div className='mt-2'>{name}</div>
    </div>
  );
};

export default Card;
