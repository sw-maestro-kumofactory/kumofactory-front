'use client';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { AreaString } from '@/src/types/Area';

interface IProps {
  type: AreaString;
  name: string;
}

const AreaItemWrapper = ({ type, name }: IProps) => {
  const createArea = useBlueprintStore((state) => state.AreaAction.createArea);

  return (
    <div className='flex flex-wrap cursor-pointer text-sm  p-2 border-solid border-gray-400 border-t-2 '>
      <div
        key={type}
        onClick={() => {
          createArea({
            id: new Date().toString(),
            width: 500,
            height: 500,
            x: 50,
            y: 50,
            type,
          });
        }}
      >
        {name}
      </div>
    </div>
  );
};

export default AreaItemWrapper;
