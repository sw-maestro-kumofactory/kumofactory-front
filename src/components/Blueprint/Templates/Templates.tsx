'use client';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons/faCopy';
import moment from 'moment';
import { v1 } from 'uuid';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { getAllTemplates, getTemplateById } from '@/src/api/template';
import { commonAxiosInstance } from '@/src/api';
import NewBlueprint from '@/src/components/Blueprint/Templates/NewBlueprint';
import TemplateCard from '@/src/components/Blueprint/Templates/TemplateCard';
import { BlueprintInfo } from '@/src/types/Blueprint';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import { useSetTemplate } from '@/src/hooks/useSetTemplate';

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), { ssr: false });

const Templates = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [templates, setTemplates] = useState<Record<string, BlueprintInfo>>({});
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const showDetail = useBlueprintStore((state) => state.showDetail);
  const initState = useBlueprintStore((state) => state.CommonAction.initState);
  const setShowDetail = useBlueprintStore((state) => state.CommonAction.setShowDetail);
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
        let t = await fetchSvgData(data[i].presignedUrl!);
        tmp[data[i].uuid] = t;
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

  const historyBackHandler = (showDetail: string) => {
    console.log('historyBack Handler : ', showDetail);
    if (showDetail) {
      setShowDetail('');
      return;
    }
    setIsTemplateOpen(false);
  };

  useEffect(() => {
    console.log('show Detail, ', showDetail);
    const func = () => historyBackHandler(showDetail);
    window.addEventListener('popstate', func);
    return () => {
      window.removeEventListener('popstate', func);
    };
  }, [showDetail]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setIsTemplateOpen(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  useEffect(() => {
    loadTemplates();

    return () => {
      setIsTemplateOpen(false);
      setShowDetail('');
    };
  }, []);

  return (
    <div className='w-[1365px] h-[685px] bg-white rounded-2xl' onClick={(e) => e.stopPropagation()}>
      {showDetail ? (
        <div className='w-full h-full'>
          <div className='flex justify-between py-[17px] pl-[27px]'>
            <div className='font-bold flex gap-x-4 items-center justify-center'>
              <FontAwesomeIcon onClick={() => setShowDetail('')} icon={faArrowLeft} />
              <div>Template Catalog</div>
            </div>
            <div className='flex gap-x-2 mr-[20px]'>
              <div>X</div>
            </div>
          </div>
          <hr />
          <div className='pt-9 px-48 max-h-[620px] overflow-y-scroll'>
            <div className='w-full flex gap-x-6'>
              <div className='w-4/5 h-full pl-2'>
                <div className='flex justify-between items-center'>
                  <div className='font-extrabold text-xl'>{templates[showDetail].name}</div>
                  <div
                    className='flex w-fit gap-x-1.5 items-center text-sm text-[#323438]'
                    onClick={(e) => onClickLoad(e, templates[showDetail].uuid)}
                  >
                    <div className='flex items-center gap-x-2 border-2 border-[#DAE2EC] rounded-md py-2 px-2'>
                      <FontAwesomeIcon icon={faCopy} />
                      {templates[showDetail].downloadCount}
                    </div>
                    <div className='font-bold p-2 border-2 border-[#DAE2EC] rounded-md'>copy</div>
                  </div>
                </div>
                <div className='flex items-center gap-x-2.5 pt-1.5'>
                  <div className='w-8 h-8 rounded-full bg-gray-500'></div>
                  <div className='text-xs text-gray-400'>Create by {templates[showDetail].username}</div>
                </div>
                <div className='flex gap-x-4 pt-3 h-8 text-sm'>
                  <div className='flex'>
                    <div>AWS</div>
                    <div>Public</div>
                  </div>
                  <div>hr</div>
                  <div className='flex'>
                    <div>❤</div>
                    <div>123</div>
                  </div>
                </div>
                <div className='py-11'>
                  <div className='text-[11px]'>
                    Created At : {moment(templates[showDetail].createdAt).format('MM/D, YYYY')}
                  </div>
                  <div className='text-[11px]'>
                    Updated At : {moment(templates[showDetail].updatedAt).format('MM/D, YYYY')}
                  </div>
                </div>
              </div>
              <div>
                <svg className='w-[290px] h-[174px] rounded-t-lg p-4 mb-4 rounded-md border-solid border-2 border-gray-400'>
                  <g dangerouslySetInnerHTML={{ __html: thumbnails[showDetail] }} />
                </svg>
              </div>
            </div>
            <hr />
            <div>
              <div className='pt-8 pb-7 font-extrabold text-xl'>Description</div>
              <MarkdownPreview
                source={templates[showDetail].description}
                style={{
                  height: 'fit',
                  padding: '20px 30px',
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='flex justify-between py-[17px] pl-[27px] items-center'>
            <div className='flex'>
              <Image width={18} height={18} alt={'catalog'} src='/icons/Design/catalog.svg' />
              <div className='ml-3 font-bold'>Cloud Infrastructure Templates Catalog</div>
            </div>

            <div className='flex items-center gap-x-2 mr-[20px]'>
              <Seperator />
              <div className='flex gap-x-1'>
                <div className='flex items-center justify-center w-8 h-8 rounded-md'>
                  <Image width={21} height={14} src='/icons/Design/logo.svg' alt='kumo' />
                </div>
                <div className='flex items-center justify-center w-8 h-8 rounded-md'>
                  <Image width={26} height={15} src='/icons/Design/public.svg' alt='public' />
                </div>
              </div>
              <Seperator />
              <div className='relative w-56 h-8 border-2 border-[#DAE2EC] rounded-md'>
                <div className='h-7 absolute right-2 flex items-center'>
                  <Image width={12} height={13} alt='search' src='/icons/Design/search.svg' />
                </div>
              </div>
              <Image width={11} height={11} alt={'quit'} src='/icons/Design/cancel.svg' />
            </div>
          </div>
          <hr />
          <div className='flex flex-wrap w-full h-[610px] overflow-y-scroll gap-x-7 gap-y-11 px-12 py-9 '>
            {currentBlueprintInfo.uuid === '' && (
              <div className='w-[290px] h-[218px]'>
                <NewBlueprint />
              </div>
            )}
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

const Seperator = () => {
  return <div className='w-0.5 h-[18px] border-s' />;
};
