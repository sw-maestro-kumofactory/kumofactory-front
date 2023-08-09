import { useState } from 'react';

import { BlueprintResponse } from '@/src/types/Blueprint';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { ServiceOptions } from '@/src/types/Services';

export const useSetTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { createService, setOption } = useBlueprintStore((state) => state.ServiceAction);
  const { createLine, setComponentLine } = useBlueprintStore((state) => state.LineAction);
  const initState = useBlueprintStore((state) => state.CommonAction.initState);
  const createArea = useBlueprintStore((state) => state.AreaAction.createArea);

  const setTemplate = ({ data }: { data: BlueprintResponse }) => {
    const services = data.components;
    const lines = data.links;
    const areas = data.areas;
    for (const service of services) {
      setOption(service.id, service.options as ServiceOptions);
      createService(
        {
          id: service.id,
          type: service.type,
          x: service.x,
          y: service.y,
          lines: [],
          options: service.options,
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
      createArea(
        {
          id: area.id,
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
