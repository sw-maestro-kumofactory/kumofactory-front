'use client';

import { v1 } from 'uuid';
import { useCallback } from 'react';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { AreaTypes, IArea } from '@/src/types/Area';
import { AreaItemType } from '@/src/types/MenuItems';
import { AccessScope } from '@/src/types/Services';

interface IProps {
  type: AreaTypes;
  scope: AccessScope | null;
  name: string;
}

const AreaItemWrapper = ({ type, name, scope }: IProps) => {
  const createArea = useBlueprintStore((state) => state.AreaAction.createArea);
  const azCount = useBlueprintStore((state) => state.azCount);
  const subnetCount = useBlueprintStore((state) => state.subnetCount);

  const createAreaByType = () => {
    const id = v1().toString();

    const area: IArea = {
      id: id,
      width: 125,
      height: 125,
      x: 40,
      y: 40,
      type: type,
      scope: null,
      az: null,
    };

    if (type === 'AZ') {
      const a = !!azCount['2a'];
      const c = !!azCount['2c'];
      if (a && c) {
        alert('AZ는 2개까지만 생성 가능합니다.');
        return;
      } else if (!a && !c) {
        area.az = 'ap-northeast-2a';
      } else if (a || c) {
        if (a) {
          area.az = 'ap-northeast-2c';
        } else {
          area.az = 'ap-northeast-2a';
        }
      }
    }
    if (type === 'Subnet') {
      if (scope === 'Public') {
        if (subnetCount.public >= 2) {
          alert('Public Subnet은 2개까지만 생성 가능합니다.');
          return;
        }
        area.scope = 'Public';
      } else if (scope === 'Private') {
        if (subnetCount.private >= 2) {
          alert('Private Subnet은 2개까지만 생성 가능합니다.');
          return;
        }
        area.scope = 'Private';
      } else if (scope === 'Database') {
        if (subnetCount.database >= 2) {
          alert('Database Subnet은 2개까지만 생성 가능합니다.');
          return;
        }
        area.scope = 'Database';
      }
    }
    createArea(area, area.type);
  };
  return (
    <div className='flex flex-wrap cursor-pointer text-sm  p-2 border-solid border-gray-400 border-t-2 '>
      <div key={type} onClick={() => createAreaByType()}>
        {name}
      </div>
    </div>
  );
};

export default AreaItemWrapper;
