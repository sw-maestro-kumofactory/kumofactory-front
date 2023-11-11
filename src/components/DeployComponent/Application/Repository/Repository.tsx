'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import moment from 'moment';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import { PersonalRepo } from '@/src/types/Deploy';

interface IProps {
  id: string;
  info: PersonalRepo;
}
const Repository = ({ id, info }: IProps) => {
  const router = useRouter();
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);

  const toSetting = () => {
    if (targetInstanceId) {
      router.push(`/blueprint/${currentBlueprintInfo.uuid}/deploy/${id}/${info.name}`);
    } else {
      alert('인스턴스를 선택해주세요.');
    }
  };

  return (
    <div className='w-[868px] p-4 border-[#DAE2EC] border rounded-md hover:bg-[#F3F6F8]'>
      <div className='flex items-center gap-x-3'>
        <div className='text-lg font-semibold text-[#00C0B5] cursor-pointer' onClick={toSetting}>
          {info.name}
        </div>
        <div className='flex items-center text-[#81929F] gap-x-1'>
          {info.visibility === 'public' ? (
            <Image width={16} height={15} src='/icons/Design/public.svg' alt='public' />
          ) : (
            <Image width={16} height={15} src='/icons/Design/private.svg' alt='private' />
          )}

          <span className='text-xs'>{info.visibility}</span>
        </div>
      </div>
      <div className='pt-3 text-[15px]'>{info.description !== 'null' ? info.description : ''}</div>
      <div className='flex items-center text-xs pt-2 gap-x-3'>
        <div className='flex items-center gap-x-1 '>
          <div className={`w-2 h-2 rounded-full `} style={{ backgroundColor: info.languageColor }}></div>
          <div>{info.language}</div>
        </div>
        <div className='flex gap-x-1 items-center border-[#DAE2EC] border rounded-md px-1.5 py-0.5 bg-white'>
          <Image width={12} height={12} src='/icons/Design/fork.svg' alt='fork' />
          <div>{info.forksCount}</div>
        </div>
        <div className='flex gap-x-1 items-center border-[#DAE2EC] border rounded-md px-1.5 py-0.5 bg-white'>
          <Image width={12} height={12} src='/icons/Design/star.svg' alt='start' />
          <div>{info.starCount}</div>
        </div>
        <div className='flex gap-x-1 items-center border-[#DAE2EC] border rounded-md px-1.5 py-0.5 bg-white'>
          <Image width={12} height={12} src='/icons/Design/issue.svg' alt='issue' />
          <div>{info.openIssuesCount}</div>
        </div>
        <div className='text-[#81929F]'>last update : {moment(info.updatedAt).format('YYYY-MM-DD')}</div>
      </div>
    </div>
  );
};

export default Repository;
