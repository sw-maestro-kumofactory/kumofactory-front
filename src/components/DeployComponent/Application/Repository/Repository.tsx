'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';

interface IProps {
  id: string;
  name: string;
  isUser: boolean;
}
const Repository = ({ id, name, isUser }: IProps) => {
  const router = useRouter();
  const currentBlueprintId = useBlueprintStore((state) => state.currentBlueprintId);
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);

  const toSetting = () => {
    if (targetInstanceId) {
      router.push(`/blueprint/${currentBlueprintId}/deploy/${id}${isUser ? '' : '?orgRepo=true'}`);
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
