'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    <div className='flex justify-between p-4'>
      <div>{name}</div>
      <div className='cursor-pointer' onClick={toSetting}>
        import
      </div>
    </div>
  );
};

export default Repository;
