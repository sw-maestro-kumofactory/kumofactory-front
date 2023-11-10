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
  const { setCurrentBlueprintInfo, setIsTemplateOpen } = useBlueprintStore((state) => state.CommonAction);
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
    setIsTemplateOpen(false);
    router.push(`/blueprint/${id}`);
  };

  return (
    <>
      <div
        className='flex flex-col items-center justify-center w-full h-[174px] text-[#96ABBB] bg-white hover:bg-[#F9FAFC] border-2 border-[#DAE2EC] rounded-md cursor-pointer hover:border-[#CCD6E2] hover:drop-shadow-md'
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faSquarePlus} className='text-2xl' />
      </div>
      <div className='font-semibold text-[#323438] text-[13px] pt-[10px]'>New Project</div>
    </>
  );
};

export default NewBlueprint;
