import { useEffect } from 'react';

import {
  InstanceType,
  InstanceTypeList,
  MySqlEngineVersionType,
  MySqlEngineVersionTypeList,
  RDSOptions,
} from '@/src/types/Services';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useInput from '@/src/hooks/useInput';

export const RDSOption = (id: string): RDSOptions => {
  return {
    id: id,
    secret: {
      id: '',
      secretName: '',
      username: '',
      password: '',
    },
    instance: {
      id: id,
      databaseName: '',
      instanceIdentifier: '',
      instanceType: 't3.micro',
      version: 'VER_8_0_33',
    },
  };
};

const AttributeName = ({ text }: { text: string }) => {
  return <div className='text-[#7f7f7f] hover:text-black my-4'>{text}</div>;
};

export const RDSOptionComponent = ({ id }: { id: string }) => {
  const options = useBlueprintStore((state) => state.options);
  const setOption = useBlueprintStore((state) => state.ServiceAction.setOption);
  const selectedOptions = options[id] as RDSOptions;

  // secret
  const {
    value: secretName,
    valueRef: secretNameRef,
    onHandleChange: handleSecretNameChange,
  } = useInput<string>(selectedOptions?.secret.secretName ?? '');
  const {
    value: username,
    valueRef: usernameRef,
    onHandleChange: handleUsernameChange,
  } = useInput<string>(selectedOptions?.secret.username ?? '');
  const {
    value: password,
    valueRef: passwordRef,
    onHandleChange: handlePasswordChange,
  } = useInput<string>(selectedOptions?.secret.password ?? '');

  // instance
  const {
    value: databaseName,
    valueRef: databaseNameRef,
    onHandleChange: handleDatabaseNameChange,
  } = useInput<string>(selectedOptions?.instance.databaseName);
  const {
    value: instanceIdentifier,
    valueRef: instanceIdentifierRef,
    onHandleChange: handleInstanceIdentifierChange,
  } = useInput<string>(selectedOptions?.instance.instanceIdentifier);
  const {
    value: instanceType,
    valueRef: instanceTypeRef,
    onHandleChange: handleInstanceTypeChange,
  } = useInput<InstanceType>(selectedOptions?.instance.instanceType);
  const {
    value: version,
    valueRef: versionRef,
    onHandleChange: handleVersionChange,
  } = useInput<MySqlEngineVersionType>(selectedOptions?.instance.version);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOption(id, {
      id: id,
      secret: {
        id: id,
        secretName: secretName,
        username: username,
        password: password,
      },
      instance: {
        id: id,
        databaseName: databaseName,
        instanceIdentifier: instanceIdentifier,
        instanceType: instanceType,
        version: version,
      },
    } as RDSOptions);
  };

  useEffect(() => {
    return () => {
      setOption(id, {
        id: id,
        secret: {
          id: id,
          secretName: secretNameRef.current,
          username: usernameRef.current,
          password: passwordRef.current,
        },
        instance: {
          id: id,
          databaseName: databaseNameRef.current,
          instanceIdentifier: instanceIdentifierRef.current,
          instanceType: instanceTypeRef.current,
          version: versionRef.current,
        },
      } as RDSOptions);
    };
  }, []);

  if (!selectedOptions) return <></>;

  return (
    <form onSubmit={handleOnSubmit}>
      <div className='text-xl my-4 text-[#799ACF]'> RDS Setting</div>
      <AttributeName text={'Database Name'} />
      <input type='text' value={databaseName} onChange={handleDatabaseNameChange} />
      <AttributeName text={'Instance Identifier'} />
      <input type='text' value={instanceIdentifier} onChange={handleInstanceIdentifierChange} />
      <AttributeName text={'Instance Type'} />
      <select value={instanceType} onChange={handleInstanceTypeChange}>
        {InstanceTypeList.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <AttributeName text={'Version'} />
      <select value={version} onChange={handleVersionChange}>
        {MySqlEngineVersionTypeList.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className='text-xl my-4 text-[#799ACF]'> Secret Setting</div>
      <AttributeName text={'Secret Name'} />
      <input type='text' value={secretName} onChange={handleSecretNameChange} />
      <AttributeName text={'Username'} />
      <input type='text' value={username} onChange={handleUsernameChange} />
      <AttributeName text={'Password'} />
      <input type='text' value={password} onChange={handlePasswordChange} />
    </form>
  );
};
