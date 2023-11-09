'use client';

import { useEffect } from 'react';

import { ELBOptions } from '@/src/types/Services';
import useInput from '@/src/hooks/useInput';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';

export const NLBOption = (id: string): ELBOptions => {
  return {
    id: id,
    port: 0,
    targetGroupPort: 0,
    targetGroupName: '',
    targetGroupId: '',
    healthCheckPath: '', // url for health check
    name: '',
    listenerId: '',
  };
};

const AttributeName = ({ text }: { text: string }) => {
  return <div className='text-[#7f7f7f] hover:text-black my-4'>{text}</div>;
};

export const NLBOptionComponent = (id: string) => {
  const options = useBlueprintStore((state) => state.options);
  const setOption = useBlueprintStore((state) => state.ServiceAction.setOption);
  const selectedOptions = options[id] as ELBOptions;
  const { value: port, valueRef: portRef, onHandleChange: handlePortChange } = useInput<number>(selectedOptions?.port);
  const {
    value: targetGroupPort,
    valueRef: targetGroupPortRef,
    onHandleChange: handleTargetGroupPortChange,
  } = useInput<number>(selectedOptions?.targetGroupPort);
  const {
    value: targetGroupName,
    valueRef: targetGroupNameRef,
    onHandleChange: handleTargetGroupNameChange,
  } = useInput<string>(selectedOptions?.targetGroupName);
  const {
    value: targetGroupId,
    valueRef: targetGroupIdRef,
    onHandleChange: handleTargetGroupIdChange,
  } = useInput<string>(selectedOptions?.targetGroupId);
  const {
    value: healthCheckPath,
    valueRef: healthCheckPathRef,
    onHandleChange: handleHealthCheckPathChange,
  } = useInput<string>(selectedOptions?.healthCheckPath);
  const { value: name, valueRef: nameRef, onHandleChange: handleNameChange } = useInput<string>(selectedOptions?.name);
  const {
    value: listenerId,
    valueRef: listenerIdRef,
    onHandleChange: handleListenerIdChange,
  } = useInput<string>(selectedOptions?.listenerId);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOption(id, {
      port: port,
      targetGroupPort: targetGroupPort,
      targetGroupName: targetGroupName,
      targetGroupId: targetGroupId,
      healthCheckPath: healthCheckPath,
      name: name,
      listenerId: listenerId,
    } as ELBOptions);
  };

  useEffect(() => {
    return () => {
      setOption(id, {
        port: portRef.current,
        targetGroupPort: targetGroupPortRef.current,
        targetGroupName: targetGroupNameRef.current,
        targetGroupId: targetGroupIdRef.current,
        healthCheckPath: healthCheckPathRef.current,
        name: nameRef.current,
        listenerId: listenerIdRef.current,
      } as ELBOptions);
    };
  }, []);

  if (!selectedOptions) return <></>;
  return <></>;
  // return (
  // <form onSubmit={handleOnSubmit}>
  //   <AttributeName text={'Name'} />
  //   <input type='text' value={name} onChange={handleNameChange} />
  //   <AttributeName text={'Port'} />
  //   <input type='number' value={port} onChange={handlePortChange} />
  //   <AttributeName text={'Target Group Port'} />
  //   <input type='number' value={targetGroupPort} onChange={handleTargetGroupPortChange} />
  //   <AttributeName text={'Target Group Name'} />
  //   <input type='text' value={targetGroupName} onChange={handleTargetGroupNameChange} />
  //   <AttributeName text={'Target Group ID'} />
  //   <input type='text' value={targetGroupId} onChange={handleTargetGroupIdChange} />
  //   <AttributeName text={'Health Check Path'} />
  //   <input type='text' value={healthCheckPath} onChange={handleHealthCheckPathChange} />
  //   <AttributeName text={'Listener ID'} />
  //   <input type='text' value={listenerId} onChange={handleListenerIdChange} />
  // </form>
  // );
};
