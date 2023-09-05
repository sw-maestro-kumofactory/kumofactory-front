'use client';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons/faCopy';
import moment from 'moment';
import { v1 } from 'uuid';
import { useRouter } from 'next/navigation';

import { getAllTemplates, getTemplateById } from '@/src/api/template';
import { commonAxiosInstance } from '@/src/api';
import NewBlueprint from '@/src/components/Blueprint/Templates/NewBlueprint';
import TemplateCard from '@/src/components/Blueprint/Templates/TemplateCard';
import { BlueprintInfo } from '@/src/types/Blueprint';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import { useSetTemplate } from '@/src/hooks/useSetTemplate';

const Templates = () => {
  const router = useRouter();
  const [templates, setTemplates] = useState<Record<string, BlueprintInfo>>({});
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [showDetail, setShowDetail] = useState<string>('');
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const initState = useBlueprintStore((state) => state.CommonAction.initState);
  const addUserBlueprint = useAuthStore((state) => state.UserBlueprintAction.addUserBlueprint);
  const { setCurrentBlueprintInfo, setIsTemplateOpen } = useBlueprintStore((state) => state.CommonAction);

  const { setTemplate } = useSetTemplate();

  const fetchSvgData = async (data: string) => {
    try {
      const urlParts = data.split('/');
      const url = `/svg/${urlParts[3]}/${urlParts[4]}`;
      const response = await commonAxiosInstance.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching SVG data:', error);
    }
  };

  const loadTemplates = async () => {
    try {
      const data = await getAllTemplates();
      const tmp: Record<string, string> = {};
      const templateObj: Record<string, BlueprintInfo> = {};
      for (let i = 0; i < data.length; i++) {
        // let t = await fetchSvgData(data[i].presignedUrl!);
        // tmp[data[i].uuid] = t;
        templateObj[data[i].uuid] = data[i];
      }
      setThumbnails(tmp);
      setTemplates(templateObj);
    } catch (e) {
      console.log(e);
    }
  };

  const onClickLoad = async (e: any, id: string) => {
    e.stopPropagation();
    const flag = currentBlueprintInfo.uuid === '';
    try {
      const newUUID = v1().toString();
      const templateData = await getTemplateById(id);
      if (flag) {
        initState(newUUID);
        templateData.uuid = newUUID;

        const templateInfo: BlueprintInfo = {
          name: 'New Blueprint',
          description: '',
          scope: 'PRIVATE',
          status: 'PENDING',
          uuid: newUUID,
        };
        setCurrentBlueprintInfo(templateInfo);
        addUserBlueprint(templateInfo, false);
      }

      setTemplate({ data: templateData, isTemplate: true });
      setIsTemplateOpen(false);
      if (flag) router.push(`/blueprint/${newUUID}`);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <div className='w-[90%] h-[90%] bg-white rounded-2xl p-8' onClick={(e) => e.stopPropagation()}>
      {showDetail ? (
        <div className='w-full h-full'>
          <div className='flex items-center gap-x-2 text-2xl font-bold'>
            <FontAwesomeIcon onClick={() => setShowDetail('')} icon={faArrowLeft} />
            Template List
          </div>
          <div className='w-full h-[95%] flex pt-4'>
            <div className='w-1/5 h-full pr-4'>
              <svg className='w-full rounded-t-lg p-4 mb-4 rounded-md border-solid border-2 border-gray-400'>
                <g dangerouslySetInnerHTML={{ __html: thumbnails[showDetail] }} />
              </svg>
              <div className='text-sm'>Created At : {moment(templates[showDetail].createdAt).format('MM/D, YYYY')}</div>
              <div className='text-sm'>Updated At : {moment(templates[showDetail].updatedAt).format('MM/D, YYYY')}</div>
            </div>
            <div className='w-4/5 h-full pl-2'>
              <div className='text-2xl mb-2'>{templates[showDetail].name}</div>
              <div className='text-xs text-gray-400 mb-4'>Create by {templates[showDetail].username}</div>
              <hr />
              <div
                className='flex w-fit gap-x-4 items-center mt-4 p-2 text-sm text-[#6e58f6] border-solid border-2 border-[#6e58f6] rounded-lg cursor-pointer'
                onClick={(e) => onClickLoad(e, templates[showDetail].uuid)}
              >
                <div className='flex items-center gap-x-2 '>
                  <FontAwesomeIcon icon={faCopy} />
                  {templates[showDetail].downloadCount}
                </div>
                <div className='w-[2px] h-[28px] bg-gray-400' />
                <div className='font-bold'>copy</div>
              </div>
              <div className='w-fit text-lg text-[#6e58f6] p-2 mt-8 border-b-2 border-solid border-[#6e58f6] hover:bg-gray-100'>
                Description
              </div>
              <hr />
              <div className='mt-2'>{templates[showDetail].description}</div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='text-2xl font-bold'>Templates</div>
          <div className='flex flex-wrap w-full h-[95%] overflow-y-scroll mt-4 '>
            <div className='w-1/3 h-2/5 p-4'>
              <NewBlueprint />
            </div>
            <>
              {Object.keys(templates).map((key) => {
                return (
                  <TemplateCard
                    key={templates[key].uuid}
                    data={templates[key]}
                    thumbnail={thumbnails[templates[key].uuid]}
                    onClick={() => {
                      setShowDetail(templates[key].uuid);
                    }}
                    onClickLoad={onClickLoad}
                  />
                );
              })}
            </>
          </div>
        </>
      )}
    </div>
  );
};

export default Templates;
