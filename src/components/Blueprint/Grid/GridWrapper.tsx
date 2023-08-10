'use client';
import { PropsWithChildren, useEffect, useState } from 'react';

import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { useSetTemplate } from '@/src/hooks/useSetTemplate';
import Loading from '@/src/components/common/Loading';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import { getBlueprintListById } from '@/src/api/blueprint';
import { getTemplateById } from '@/src/api/template';

interface IProps extends PropsWithChildren {
  blueprintId: string;
}

const GridWrapper = ({ blueprintId, children }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const blueprintList = useBlueprintStore((state) => state.blueprintList);
  const { setTargetInstanceId, setTargetInstanceType } = useDeployStore((state) => state.DeployAction);
  const { initState } = useBlueprintStore((state) => state.CommonAction);
  const { setTemplate } = useSetTemplate();

  const setData = async (id: string) => {
    if (blueprintList.includes(id)) {
      setIsLoading(false);
    } else {
      initState(blueprintId);
      setTargetInstanceId('');
      setTargetInstanceType('');
      try {
        const data = await getBlueprintListById(id);
        setTemplate({ data: data, isTemplate: false });
      } catch (e) {}
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setData(blueprintId);
  }, []);

  if (isLoading) return <Loading />;

  return <>{children}</>;
};

export default GridWrapper;