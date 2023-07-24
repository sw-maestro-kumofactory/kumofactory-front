import { useState } from 'react';

import { BlueprintResponse } from '@/src/types/Blueprint';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

export const useSetTemplate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const createService = useBlueprintStore((state) => state.ServiceAction.createService);
  const createLine = useBlueprintStore((state) => state.LineAction.createLine);
  const setComponentLine = useBlueprintStore((state) => state.LineAction.setComponentLine);
  const initState = useBlueprintStore((state) => state.CommonAction.initState);
  const createArea = useBlueprintStore((state) => state.AreaAction.createArea);
  const setTemplate = ({ data }: { data: BlueprintResponse }) => {
    //add for initialize State
    initState();

    const services = data.components;
    const lines = data.links;
    const areas = data.areas;

    for (const service of services) {
      createService(
        {
          id: service.id,
          type: service.type,
          x: service.x,
          y: service.y,
          options: {},
          lines: [],
        },
        service.id,
      );
    }
    for (const line of lines) {
      createLine(line.id, line.src, line.dst);
      setComponentLine(line.id, line.src.componentId);
      setComponentLine(line.id, line.dst.componentId);
    }

    for (const area of areas) {
      createArea({ id: area.id, x: area.x, y: area.y, width: area.width, height: area.height, type: area.type });
    }
  };

  return { isLoading, setIsLoading, setTemplate };
};
