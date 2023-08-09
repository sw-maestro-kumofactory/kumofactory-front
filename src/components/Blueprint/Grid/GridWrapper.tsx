'use client';
import { PropsWithChildren, useEffect, useState } from 'react';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import Grid from '@/src/components/Blueprint/Grid/Grid';
import { useSetTemplate } from '@/src/hooks/useSetTemplate';
import { getTemplateListById } from '@/src/api/template';
import Loading from '@/src/components/common/Loading';

interface IProps extends PropsWithChildren {
  blueprintId: string;
}

const GridWrapper = ({ blueprintId }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const blueprintList = useBlueprintStore((state) => state.blueprintList);
  const { initState } = useBlueprintStore((state) => state.CommonAction);
  const { setTemplate } = useSetTemplate();

  const setData = async (id: string) => {
    if (blueprintList.includes(blueprintId)) {
      setIsLoading(false);
    } else {
      initState(blueprintId);
      try {
        const data = await getTemplateListById(id);
        setTemplate({ data: data });
      } catch (e) {}
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setData(blueprintId);
  }, []);

  if (isLoading) return <Loading />;

  return <Grid id={blueprintId} />;
};

export default GridWrapper;
