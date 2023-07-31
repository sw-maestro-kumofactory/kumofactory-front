'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

interface IProps {
  id: string;
}
const Repository = ({ id }: IProps) => {
  const router = useRouter();
  const currentBlueprintId = useBlueprintStore((state) => state.currentBlueprintId);
  return (
    <div className='flex justify-between p-4'>
      <div>Repository name</div>
      <Link href={`/blueprint/${currentBlueprintId}/deploy/${id}`}>import</Link>
    </div>
  );
};

export default Repository;
