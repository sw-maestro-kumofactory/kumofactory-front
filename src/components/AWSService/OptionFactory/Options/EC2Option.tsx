'use client';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';

import { AccessScope, AccessScopeList, AvailabilityZone, EC2Options, InstanceTypeList } from '@/src/types/Services';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useInput from '@/src/hooks/useInput';

export const EC2Option = (id: string): EC2Options => {
  return {
    instanceType: 't3.micro',
    machineImage: '',
    subnetType: null,
    availabilityZone: null,
    instanceName: id,
    id: id,
    securityGroupType: null,
  };
};

const AttributeName = ({ text }: { text: string }) => {
  return <div className='text-[#7f7f7f] hover:text-black my-4'>{text}</div>;
};

export const EC2OptionComponent = ({ id }: { id: string }) => {
  const [isHover, setIsHover] = useState(false);
  const options = useBlueprintStore((state) => state.options);
  const [top, setTop] = useState(0);
  const selectedOptions = options[id] as EC2Options;
  const setOption = useBlueprintStore((state) => state.ServiceAction.setOption);
  const instanceTypes = InstanceTypeList;
  const securityGroupTypes = AccessScopeList;
  const {
    value: instanceType,
    valueRef: instanceTypeRef,
    onHandleChange: handleInstanceTypeChange,
  } = useInput<string>(selectedOptions?.instanceType);
  const {
    value: instanceName,
    valueRef: instanceNameRef,
    onHandleChange: handleInstanceNameChange,
  } = useInput<string>(selectedOptions?.instanceName);
  const {
    value: securityGroupType,
    valueRef: securityGroupTypeRef,
    onHandleChange: handleSecurityGroupTypeChange,
  } = useInput<string | null>(selectedOptions?.subnetType);
  const {
    value: subnetType,
    valueRef: subnetTypeRef,
    onHandleChange: handleSubnetTypeChange,
  } = useInput<AccessScope | null>(selectedOptions?.subnetType);
  const {
    value: availabilityZone,
    valueRef: availabilityZoneRef,
    onHandleChange: handleAvailabilityZoneChange,
  } = useInput<AvailabilityZone | null>(selectedOptions?.availabilityZone);

  const mouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTop(e.clientY + 20);
    setIsHover(true);
  };

  const mouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHover(false);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOption(id, {
      id: id,
      instanceType: instanceType,
      machineImage: '',
      subnetType: subnetType,
      availabilityZone: availabilityZone,
      instanceName: instanceName,
      securityGroupType: subnetType,
    } as EC2Options);
  };

  useEffect(() => {
    return () =>
      setOption(id, {
        id: id,
        instanceType: instanceTypeRef.current,
        machineImage: '',
        subnetType: subnetTypeRef.current,
        availabilityZone: availabilityZoneRef.current,
        instanceName: instanceNameRef.current,
        securityGroupType: subnetTypeRef.current,
      } as EC2Options);
  }, []);

  if (!selectedOptions) return <></>;

  return (
    <form onSubmit={handleOnSubmit}>
      <AttributeName text='Instance Type' />
      <div className='flex align-middle'>
        <select value={instanceType} onChange={handleInstanceTypeChange}>
          {instanceTypes.map((instanceType) => (
            <option key={instanceType} value={instanceType}>
              {instanceType}
            </option>
          ))}
        </select>
        <div className='flex items-center ml-8 w-8 h-8' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
          <FontAwesomeIcon icon={faCircleQuestion} />
        </div>
        {isHover && (
          <Image
            width={500}
            height={500}
            style={{ top: `${top}px` }}
            className='fixed bg-opacity-0 top-40 right-4'
            src={'/typelist.png'}
            alt={'typelist'}
          />
        )}
      </div>

      <AttributeName text={'Machine Image'} />
      <input value='amazon linux 2023' disabled />
      <AttributeName text={'Subnet Type'} />
      <input value={selectedOptions.subnetType ? selectedOptions.subnetType : ''} disabled />
      <AttributeName text={'Availability Zone'} />
      <input value={selectedOptions.availabilityZone ? selectedOptions.availabilityZone : ''} disabled />
      <AttributeName text={'Instance Name'} />
      <input type='text' value={instanceName} onChange={handleInstanceNameChange} />
      <AttributeName text={'Security Group Type'} />
      <select value={securityGroupType ? securityGroupType : ''} onChange={handleSecurityGroupTypeChange}>
        {securityGroupTypes.map((securityGroupType) => (
          <option key={securityGroupType} value={securityGroupType}>
            {securityGroupType}
          </option>
        ))}
      </select>
      <button type='submit'>Submit</button>
    </form>
  );
};
