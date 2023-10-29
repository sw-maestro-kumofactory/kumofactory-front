'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';

interface IProps {
  id: string;
  name: string;
}
const Repository = ({ id, name }: IProps) => {
  const router = useRouter();
  const currentBlueprintInfo = useBlueprintStore((state) => state.currentBlueprintInfo);
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);

  const toSetting = () => {
    if (targetInstanceId) {
      router.push(`/blueprint/${currentBlueprintInfo.uuid}/deploy/${id}/${name}`);
    } else {
      alert('인스턴스를 선택해주세요.');
    }
  };

  return (
    <div className='w-[868px] p-4 border-[#DAE2EC] border rounded-md'>
      <div className='flex items-center gap-x-5'>
        <div className='text-lg font-semibold text-[#00C0B5]'>{name}</div>
        <div className='flex items-center text-[#81929F] gap-x-1'>
          <Image width={16} height={15} src='/icons/Design/public.svg' alt='public' />
          <span className='text-xs'>public</span>
        </div>
      </div>
      <div className='pt-3'>if description ? description</div>
      <div className='flex items-center text-xs pt-2 gap-x-3'>
        <div className='flex items-center gap-x-1'>
          <div className='w-2 h-2 rounded-full bg-blue-600'></div>
          <div>typescript</div>
        </div>
        <div className='flex gap-x-1 items-center border-[#DAE2EC] border rounded-md px-2 py-1'>
          <div>fork icon</div>
          <div>fork count</div>
        </div>
        <div className='flex gap-x-1 items-center border-[#DAE2EC] border rounded-md px-2 py-1'>
          <div>star icon</div>
          <div>star count</div>
        </div>
        <div className='flex gap-x-1 items-center border-[#DAE2EC] border rounded-md px-2 py-1'>
          <div>issue icon</div>
          <div>issue count</div>
        </div>
        <div>last updated</div>
      </div>
    </div>
  );
};

export default Repository;
