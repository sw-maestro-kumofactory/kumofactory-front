'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { getBlueprintListById } from '@/src/api/blueprint';
import Loading from '@/src/components/common/Loading';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import { useSetTemplate } from '@/src/hooks/useSetTemplate';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';

interface IProps extends PropsWithChildren {
  blueprintId: string;
}

const GridWrapper = ({ blueprintId, children }: IProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const blueprintList = useBlueprintStore((state) => state.blueprintList);
  const isKumoTemplate = useBlueprintStore((state) => state.isKumoTemplate);
  const userBlueprints = useAuthStore((state) => state.userBlueprints);
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);
  const { setTargetInstanceId, setTargetInstanceType } = useDeployStore((state) => state.DeployAction);
  const { initState, setCurrentBlueprintInfo, initMouseState } = useBlueprintStore((state) => state.CommonAction);
  const { setTemplate } = useSetTemplate();

  const setData = async (id: string) => {
    if (!blueprintList.includes(id)) {
      initState(blueprintId);
      setTargetInstanceType('');
      try {
        const data = await getBlueprintListById(id);
        setTemplate({ data: data, isTemplate: false });
      } catch (e) {}
    }
    if (!targetInstanceId) setTargetInstanceId('');
    setCurrentBlueprintInfo({
      uuid: blueprintId,
      name: userBlueprints[id].name,
      scope: userBlueprints[id].scope,
      description: userBlueprints[id].description,
      status: userBlueprints[id].status,
      isTemplate: false,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    if (!Object.keys(userBlueprints).includes(blueprintId) && !isKumoTemplate) {
      alert('잘못된 접근입니다.');
      router.push('/blueprint');
    } else if (isKumoTemplate) {
      initMouseState();
      setIsLoading(false);
    } else {
      initMouseState();
      setData(blueprintId);
    }
    return () => {};
  }, []);

  if (isLoading) return <Loading />;

  return <>{children}</>;
};

export default GridWrapper;
