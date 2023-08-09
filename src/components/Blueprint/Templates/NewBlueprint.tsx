'use client';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { v1 } from 'uuid';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

const NewBlueprint = () => {
  const router = useRouter();
  const initState = useBlueprintStore((state) => state.CommonAction.initState);

  const onClick = () => {
    const id = v1().toString();
    initState(id);
    router.push(`/blueprint/${id}`);
  };

  return (
    <div
      className='flex flex-col items-center justify-center w-full h-5/6 text-sky-700 bg-gray-200 border-4 hover:border-sky-700 rounded-2xl cursor-pointer'
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faSquarePlus} className='text-4xl mb-4' />
      New BluePrint
    </div>
  );
};

export default NewBlueprint;
