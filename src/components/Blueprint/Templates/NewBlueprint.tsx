'use client';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { v1 } from 'uuid';

import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { BlueprintInfo } from '@/src/types/Blueprint';

const NewBlueprint = () => {
  const router = useRouter();
  const addUserBlueprint = useAuthStore((state) => state.UserBlueprintAction.addUserBlueprint);
  const setCurrentBlueprintInfo = useBlueprintStore((state) => state.CommonAction.setCurrentBlueprintInfo);
  const initState = useBlueprintStore((state) => state.CommonAction.initState);

  const onClick = () => {
    const id = v1().toString();

    initState(id);
    const blueprintData: BlueprintInfo = {
      name: 'New Blueprint',
      description: '',
      scope: 'PRIVATE',
      status: 'PENDING',
      uuid: id,
    };

    setCurrentBlueprintInfo(blueprintData);
    addUserBlueprint(blueprintData, false);
    router.push(`/blueprint/${id}`);
  };

  return (
    <div
      className='flex flex-col items-center justify-center w-full h-full text-sky-700 bg-gray-200 border-4 hover:border-sky-700 rounded-2xl cursor-pointer'
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faSquarePlus} className='text-4xl mb-4' />
      New BluePrint
    </div>
  );
};

export default NewBlueprint;
