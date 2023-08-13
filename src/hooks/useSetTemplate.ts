import { useState } from 'react';
import { v1 } from 'uuid';

import { BlueprintResponse } from '@/src/types/Blueprint';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { ServiceOptions } from '@/src/types/Services';

export const useSetTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createService, setOption } = useBlueprintStore((state) => state.ServiceAction);
  const { createLine, setComponentLine } = useBlueprintStore((state) => state.LineAction);
  const { setBlueprintScope } = useBlueprintStore((state) => state.CommonAction);
  const createArea = useBlueprintStore((state) => state.AreaAction.createArea);

  const setTemplate = ({ data, isTemplate }: { data: BlueprintResponse; isTemplate: boolean }) => {
    console.log(1);
    let keyMap: Record<string, string> = {};
    const services = data.components;
    const lines = data.links;
    const areas = data.areas;
    console.log(2);
    setBlueprintScope(data.uuid, data.scope);
    console.log(3);

    for (const service of services) {
      let id = service.id;
      if (isTemplate) {
        const newId = v1().toString();
        keyMap[id] = newId;
        id = newId;
      }
      setOption(id, service.options as ServiceOptions);
      createService(
        {
          id: id,
          type: service.type,
          x: service.x,
          y: service.y,
          lines: [],
          options: service.options,
        },
        id,
      );
    }
    console.log(4);
    for (const line of lines) {
      let src = line.src;
      let dst = line.dst;
      if (isTemplate) {
        src.componentId = keyMap[src.componentId];
        dst.componentId = keyMap[dst.componentId];
      }
      createLine(line.id, src, dst);
      setComponentLine(line.id, src.componentId);
      setComponentLine(line.id, dst.componentId);
    }
    console.log(5);
    for (const area of areas) {
      const id = isTemplate ? v1().toString() : area.id;
      createArea(
        {
          id: id,
          x: area.x,
          y: area.y,
          width: area.width,
          height: area.height,
          type: area.type,
          az: area.az,
          scope: area.scope,
        },
        area.type,
      );
    }
    console.log(6);
  };

  return { isLoading, setIsLoading, setTemplate };
};
