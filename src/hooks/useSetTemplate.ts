import { useState } from 'react';

import { IBlueprintResponse } from '@/src/api/template';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

export const useSetTemplate = () => {
  const [isLoading, setIsLoading] = useState(true);
  const createService = useBlueprintStore((state) => state.ServiceAction.createService);
  const createLine = useBlueprintStore((state) => state.LineAction.createLine);
  const setComponentLine = useBlueprintStore((state) => state.LineAction.setComponentLine);
  const initState = useBlueprintStore((state) => state.CommonAction.initState);
  const setTemplate = ({ data }: { data: IBlueprintResponse }) => {
    //add for initialize State
    initState();

    const services = data.components;
    const lines = data.links;

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
  };

  return { isLoading, setIsLoading, setTemplate };
};
