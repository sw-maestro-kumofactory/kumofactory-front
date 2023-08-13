import { useEffect, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { v1 } from 'uuid';

import { commonAxiosInstance } from '@/src/api';
import { BlueprintInfo } from '@/src/types/Blueprint';
import { StatusStyle } from '@/src/assets/StatusStyle';
import { useSetTemplate } from '@/src/hooks/useSetTemplate';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { getTemplateById } from '@/src/api/template';

const Card = ({ data, isTemplate }: { data: BlueprintInfo; isTemplate: boolean }) => {
  const router = useRouter();
  const [isHover, setIsHover] = useState(false);
  const [svgData, setSvgData] = useState<string>('');
  const initState = useBlueprintStore((state) => state.CommonAction.initState);
  const { setCurrentBlueprintInfo, setBlueprintScope } = useBlueprintStore((state) => state.CommonAction);
  const { setTemplate } = useSetTemplate();

  const onCLickLoad = async () => {
    if (isTemplate) {
      try {
        const newUUID = v1().toString();
        initState(newUUID);
        const templateData = await getTemplateById(data.uuid);
        templateData.uuid = newUUID;
        setCurrentBlueprintInfo({
          ...data,
          uuid: newUUID,
        });
        setTemplate({ data: templateData, isTemplate: true });
        setBlueprintScope(newUUID, 'PRIVATE');
        router.push(`/blueprint/${newUUID}`);
      } catch (e) {
        console.log(e);
      }
    } else {
      setCurrentBlueprintInfo(data);
      router.push(`/blueprint/${data.uuid}`);
    }
  };

  const onClickToDeploy = () => {
    router.push(`/blueprint/${data.uuid}/deploy`);
  };

  const fetchSvgData = async () => {
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
        className='ImageWrapper w-full h-4/5 relative rounded-t-2xl'
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isHover && (
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='cursor-pointer' onClick={onCLickLoad}>
              <div
                className={`flex justify-center items-center bg-black p-2 text-white h-10 rounded-xl ${
                  !isTemplate && 'mb-4'
                }`}
              >
                Load {isTemplate ? 'Template' : 'Blueprint'}
              </div>
            </div>
            {!isTemplate && (
              <div onClick={onClickToDeploy}>
                <div className='flex justify-center items-center w-fit p-2 h-10 text-white border-white border-2 rounded-xl cursor-pointer'>
                  Application Deploy
                </div>
              </div>
            )}
          </div>
        )}
        <div className='w-full h-full border-gray-300 border-solid border-2 rounded-t-2xl'>
          <div className='absolute right-5 top-4 border-2 border-solid border-black/80 w-fit p-2 rounded-2xl'>
            {data.scope}
          </div>
          <svg className='w-full  h-full rounded-t-2xl'>
            {svgData && <g dangerouslySetInnerHTML={{ __html: svgData }} />}
            {isHover && <rect width='100%' height='100%' className='fill-blue-950 opacity-50' />}
          </svg>
        </div>
      </div>
      <div className='flex justify-between items-center p-4 h-1/5 rounded-b-2xl border-solid border-b-2 border-l-2 border-r-2 border-gray-300'>
        <div>
          <div className='mb-2.5 text-xl'>{data.name}</div>
          <div>{moment(data.createdAt).format('YYYY-MM-DD')}</div>
        </div>
        {data.status && (
          <div className='flex items-center gap-x-2'>
            <div className={`w-6 h-6 rounded-full`} style={{ backgroundColor: StatusStyle[data.status].fill }}></div>
            <div className='w-fit flex justify-center'>{data.status}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
