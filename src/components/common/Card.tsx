import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { commonAxiosInstance } from '@/src/api';
import { BlueprintInfo } from '@/src/types/Blueprint';
import { StatusStyle } from '@/src/assets/StatusStyle';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

interface IProps {
  data: BlueprintInfo;
  isTemplate: boolean;
  onClickDelete?: () => void;
}

const Card = ({ data, isTemplate, onClickDelete }: IProps) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const [svgData, setSvgData] = useState<string>('');
  const { setCurrentBlueprintInfo, setBlueprintScope } = useBlueprintStore((state) => state.CommonAction);

  const onClickLoad = async () => {
    setCurrentBlueprintInfo(data);
    router.push(`/blueprint/${data.uuid}`);
  };

  const onClickToDeploy = () => {
    router.push(`/blueprint/${data.uuid}/deploy`);
  };

  const fetchSvgData = async () => {
    if (!data.presignedUrl) return;
    try {
      const urlParts = data.presignedUrl!.split('/');
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
        className='ImageWrapper w-full h-3/4 relative rounded-t-xl'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isHover && (
          <>
            <div
              className='absolute right-5 top-4 w-8 h-8 rounded-full border-solid border-2 border-gray-400 flex justify-center items-center cursor-pointer'
              onClick={onClickDelete}
            >
              <FontAwesomeIcon style={{ color: 'white' }} icon={faTrashCan} />
            </div>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
              <div className='cursor-pointer' onClick={onClickLoad}>
                <div className={`flex justify-center items-center bg-black text-white h-10 rounded-xl ${'mb-4 p-2'}`}>
                  Load Blueprint
                </div>
              </div>

              <div onClick={onClickToDeploy}>
                <div className='flex justify-center items-center w-fit p-2 h-10 text-white border-white border-2 rounded-xl cursor-pointer'>
                  Application Deploy
                </div>
              </div>
            </div>
          </>
        )}
        <div className='w-full h-full border-gray-300 border-solid border-2 rounded-t-xl'>
          <div className='absolute left-5 top-4 border-2 text-xs border-solid border-gray-400 w-fit p-1 rounded-xl'>
            {data.scope}
          </div>
          <svg className='w-full  h-full rounded-t-lg '>
            {svgData && <g dangerouslySetInnerHTML={{ __html: svgData }} />}
            {isHover && <rect width='100%' height='100%' className='fill-blue-950 opacity-50' />}
          </svg>
        </div>
      </div>
      <div className='flex justify-between items-center p-4 h-1/4 rounded-b-xl border-solid border-b-2 border-l-2 border-r-2 border-gray-300'>
        <div>
          <div className='h-6 mb-1 font-bold text-base max-w-[250px] overflow-y-hidden overflow-x-hidden whitespace-nowrap text-ellipsis'>
            {data.name}
          </div>
          <div className='text-sm'>{moment(data.createdAt).format('YYYY-MM-DD')}</div>
        </div>
        {data.status && (
          <div className='flex items-center gap-x-2'>
            <div
              className='w-6 h-6 rounded-full cursor-pointer'
              style={{ backgroundColor: StatusStyle[data.status].fill }}
            ></div>
            {/*<div className='w-fit text-xs flex justify-center'>{data.status}</div>*/}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
