import { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';

import { commonAxiosInstance } from '@/src/api';
import { BlueprintInfo } from '@/src/types/Blueprint';
import { StatusStyle } from '@/src/assets/StatusStyle';

const Card = ({ data }: { data: BlueprintInfo }) => {
  const [isHover, setIsHover] = useState(false);
  const [svgData, setSvgData] = useState<string>('');

  const fetchSvgData = async () => {
    try {
      const urlParts = data.presignedUrl.split('/');
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
        className='ImageWrapper w-full h-5/6 relative rounded-t-2xl'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Link href={`/blueprint/${data.uuid}`}>
              <div className='flex justify-center items-center bg-black p-2 text-white h-10 rounded-xl mb-4'>
                Load Blueprint
              </div>
            </Link>
            <Link href={`/blueprint/${data.uuid}/deploy`}>
              <div className='flex justify-center items-center w-fit p-2 h-10 text-white border-white border-2 rounded-xl'>
                Application Deploy
              </div>
            </Link>
          </div>
        )}
        <svg className='w-full h-full border-gray-300 border-solid border-2 rounded-t-2xl'>
          {svgData && <g dangerouslySetInnerHTML={{ __html: svgData }} />}
          {isHover && <rect width='100%' height='100%' className='fill-blue-950 opacity-50' />}
        </svg>
      </div>
      <div className='flex justify-between items-center p-4 rounded-b-2xl border-solid border-b-2 border-l-2 border-r-2 border-gray-300'>
        <div>
          <div className='mb-2.5 text-xl'>{data.name}</div>
          <div>{moment(data.createdAt).format('YYYY-mm-DD')}</div>
        </div>
        <div className='flex items-center gap-x-2'>
          <div className={`w-8 h-8 rounded-full`} style={{ backgroundColor: StatusStyle[data.status].fill }}></div>
          <div className='w-fit flex justify-center'>{data.status}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
