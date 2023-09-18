'use client';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { ServicesString } from '@/src/types/Services';
import { OptionFactoryInstance } from '@/src/components/AWSService/OptionFactory/OptionFactory';

interface props {
  id: string;
  type: ServicesString;
}

const OptionContainer = ({ id, type }: props) => {
  const isShowOption = useBlueprintStore((state) => state.isShowOption);

  if (!isShowOption) return null;

  return (
    <div
      className='absolute top-16 right-0 w-60 h-[calc(100%-64px)] bg-white border-black select-none bg-opacity-90 z-50 px-4'
      onKeyDown={(e) => e.stopPropagation()}
    >
      {OptionFactoryInstance.getFormOfService(type, id)}
    </div>
  );
};

export default OptionContainer;
