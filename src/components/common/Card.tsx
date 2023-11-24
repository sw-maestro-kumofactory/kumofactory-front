import moment from 'moment';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

import { commonAxiosInstance } from '@/src/api';
import { BlueprintInfo } from '@/src/types/Blueprint';
import { StatusStyle } from '@/src/assets/StatusStyle';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { kumoTemplate } from '@/src/assets/kumoTemplate';

interface IProps {
  data: BlueprintInfo;
  isTemplate: boolean;
  onClickDelete?: () => void;
}

const Card = ({ data, isTemplate, onClickDelete }: IProps) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const [svgData, setSvgData] = useState<string>('');
  const { setCurrentBlueprintInfo, setBlueprintScope, setIsTemplateOpen, setIsKumoTemplate } = useBlueprintStore(
    (state) => state.CommonAction,
  );
  const onClickLoad = async () => {
    setIsKumoTemplate(isTemplate ? data.templateName! : '');
    setCurrentBlueprintInfo(data);
    router.push(`/blueprint/${data.uuid}`);
  };

  const onClickToDeploy = () => {
    if (data.status !== 'SUCCESS') {
      alert('You can deploy only when the blueprint is successfully deployed.');
      return;
    }
    // MOCK

    setCurrentBlueprintInfo(data);
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
    <div className='w-[290px] min-w-[290px] h-[232px] min-h-[232px]'>
      <div
        className='ImageWrapper w-full h-[174px] relative rounded-t-xl'
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => setIsHover(false)}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {isHover && (
          <>
            <div
              className='absolute right-3 top-3 w-3 h-3 rounded-full border-solid border-2 border-gray-400 flex justify-center items-center cursor-pointer z-30'
              onClick={onClickDelete}
            >
              <FontAwesomeIcon style={{ color: 'white' }} icon={faTrashCan} />
            </div>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[13px] w-[141px] z-30'>
              <div className='cursor-pointer' onClick={onClickLoad}>
                <div className='flex justify-center items-center bg-[#00CBBF] text-white h-8 rounded-[3px] mb-3 p-2 cursor-pointer'>
                  Load Blueprint
                </div>
              </div>

              <div className='cursor-pointer' onClick={onClickToDeploy}>
                <div className='flex justify-center items-center h-8 bg-white text-[#323438] border-white border-2 rounded-[3px] cursor-pointer'>
                  Application Deploy
                </div>
              </div>
            </div>
          </>
        )}
        <div className='w-full h-full border-gray-300 border-solid border-2 rounded-t-md'>
          <div className='absolute right-0 bottom-0 text-xs w-fit p-2 rounded-md select-none z-20'>
            {data.scope === 'PUBLIC' ? (
              <Image width={20} height={20} src={'/icons/Design/public.svg'} alt={'public'} />
            ) : (
              <Image width={20} height={20} src={'/icons/Design/private.svg'} alt={'private'} />
            )}
          </div>
          <svg className='w-full h-full rounded-t-[4px] z-15'>
            {svgData && <g dangerouslySetInnerHTML={{ __html: svgData }} />}
            {isHover && <rect width='100%' height='100%' className='fill-[#33393F] opacity-[71%]' />}
          </svg>
          {isTemplate && (
            <>
              {isHover && (
                <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-t-md bg-[#33393F] opacity-[71%] z-20' />
              )}
              <Image
                className={`rounded-md border-gray-300 border-solid border-2 rounded-t-md z-10`}
                src={`${kumoTemplate[data.templateName!].staticImage!}`}
                fill={true}
                alt='template image'
              />
            </>
          )}
        </div>
      </div>
      <div className='flex justify-between items-center p-3 h-1/4 rounded-b-md border-solid border-b-2 border-l-2 border-r-2 border-gray-300'>
        <div>
          <div className='h-6 mb-0.5 font-semibold text-[13px] max-w-[170px] overflow-y-hidden overflow-x-hidden whitespace-nowrap text-ellipsis'>
            {data.name}
          </div>
          <div className='text-[10px] text-[#81929F]'>last updated: {moment(data.createdAt).format('YYYY-MM-DD')}</div>
        </div>
        {data.status && (
          <div className='flex items-center gap-x-2 text-[11px]'>
            <div
              className='w-[10px] h-[10px] rounded-full cursor-pointer'
              style={{ backgroundColor: StatusStyle[data.status].fill }}
            ></div>
            <div>{data.status}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
