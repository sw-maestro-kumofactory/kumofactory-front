'use client';

import { v1 } from 'uuid';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { AreaTypes } from '@/src/types/Area';

interface IProps {
  type: AreaTypes;
  name: string;
}

const AreaItemWrapper = ({ type, name }: IProps) => {
  const createArea = useBlueprintStore((state) => state.AreaAction.createArea);

  const createAreaByType = (type: AreaTypes) => {
    const id = v1().toString();
    const area = {
      id: id,
      width: 125,
      height: 125,
      x: 50,
      y: 50,
      type: type,
    };
    createArea(area, type);
  };

  return (
    <div className='flex flex-wrap cursor-pointer text-sm  p-2 border-solid border-gray-400 border-t-2 '>
      <div key={type} onClick={() => createAreaByType(type)}>
        {name}
      </div>
    </div>
  );
};

export default AreaItemWrapper;
