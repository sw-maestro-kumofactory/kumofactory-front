import { useState } from 'react';
import { v1 } from 'uuid';

import { BlueprintResponse } from '@/src/types/Blueprint';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { ServiceOptions } from '@/src/types/Services';

export const useSetTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createService, setOption } = useBlueprintStore((state) => state.ServiceAction);
  const { createLine, setComponentLine } = useBlueprintStore((state) => state.LineAction);
  const initState = useBlueprintStore((state) => state.CommonAction.initState);
  const createArea = useBlueprintStore((state) => state.AreaAction.createArea);

  const setTemplate = ({ data, isTemplate }: { data: BlueprintResponse; isTemplate: boolean }) => {
    let keyMap: Record<string, string> = {};
    const services = data.components;
    const lines = data.links;
    const areas = data.areas;
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
  };

  return { isLoading, setIsLoading, setTemplate };
};
