'use client';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { OptionFactory } from '@/src/components/AWSService/OptionFactory/OptionFactory';
import { ServicesString } from '@/src/types/Services';

interface props {
  id: string;
  type: ServicesString;
}

const OptionContainer = ({ id, type }: props) => {
  const isShowOption = useBlueprintStore((state) => state.isShowOption);
  const optionFactory = new OptionFactory();

  console.log('created: ', optionFactory);

  if (!isShowOption) return null;
  return (
    <div
      className='absolute top-16 right-0 w-1/5 h-[calc(100%-64px)] bg-white border-black select-none bg-opacity-90 z-50 px-4'
      onKeyDown={(e) => e.stopPropagation()}
    >
      {optionFactory.getFormOfService(type, id)}
    </div>
  );
};

export default OptionContainer;
