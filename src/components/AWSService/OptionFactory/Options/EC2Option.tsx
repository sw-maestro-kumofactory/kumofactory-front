'use client';
import { AccessScope, AccessScopeList, EC2Options, InstanceType, InstanceTypeList } from '@/src/types/Services';
import OptionContainer from '@/src/components/AWSService/Options/OptionContainer';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useInput from '@/src/hooks/useInput';

export const EC2Option = (id: string): EC2Options => {
  return {
    instanceType: 't2.micro',
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
  const options = useBlueprintStore((state) => state.options);
  const selectedOptions = options[id] as EC2Options;
  const setOption = useBlueprintStore((state) => state.ServiceAction.setOption);
  const instanceTypes = InstanceTypeList;
  const securityGroupTypes = AccessScopeList;
  const { value: instanceType, onHandleChange: handleInstanceTypeChange } = useInput<string>(
    selectedOptions?.instanceType,
  );
  const { value: instanceName, onHandleChange: handleInstanceNameChange } = useInput<string>(
    selectedOptions?.instanceName,
  );
  const { value: securityGroupType, onHandleChange: handleSecurityGroupTypeChange } = useInput<string | null>(
    selectedOptions?.securityGroupType,
  );

  if (!selectedOptions) return <></>;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setOption(id, {
          instanceType: instanceType,
          machineImage: '',
          subnetType: null,
          availabilityZone: null,
          instanceName: instanceName,
          id: id,
          securityGroupType: securityGroupType,
        } as EC2Options);
      }}
    >
      <AttributeName text='Instance Type' />
      <select value={instanceType} onChange={handleInstanceTypeChange}>
        {instanceTypes.map((instanceType) => (
          <option key={instanceType} value={instanceType}>
            {instanceType}
          </option>
        ))}
      </select>
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
