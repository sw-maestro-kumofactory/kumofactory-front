'use client';
import { AccessScope, EC2Options, InstanceType } from '@/src/types/Services';
import OptionContainer from '@/src/components/AWSService/Options/OptionContainer';
import useBlueprintStore from '@/src/hooks/Store/blueprint/useBlueprintStore';
import useInput from '@/src/hooks/useInput';

export const EC2Option = (id: string): EC2Options => {
  return {
    instanceType: 't2.micro',
    machineImage: '',
    subnetType: 0,
    availabilityZone: 0,
    instanceName: id,
    id: id,
    securityGroupType: 0,
  };
};

const AttributeName = ({ text }: { text: string }) => {
  return <div className='text-[#7f7f7f] hover:text-black my-4'>{text}</div>;
};

export const EC2OptionComponent = ({ id }: { id: string }) => {
  const selectedOptions = useBlueprintStore((state) => state.options[id]) as EC2Options;
  const setOption = useBlueprintStore((state) => state.ServiceAction.setOption);
  const instanceTypes = Object.keys(InstanceType);
  const securityGroupTypes = Object.keys(AccessScope);
  const { value: instanceType, onHandleChange: handleInstanceTypeChange } = useInput<string>(
    selectedOptions?.instanceType,
  );
  const { value: instanceName, onHandleChange: handleInstanceNameChange } = useInput<string>(
    selectedOptions?.instanceName,
  );
  const { value: securityGroupType, onHandleChange: handleSecurityGroupTypeChange } = useInput<AccessScope>(
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
          subnetType: 0,
          availabilityZone: 0,
          instanceName: instanceName,
          id: id,
          securityGroupType: securityGroupType,
        } as EC2Options);
        console.log('InstanceType : ', instanceType);
        console.log('InstanceName : ', instanceName);
        console.log('SecurityGroupType : ', securityGroupType);
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
      <input />
      <AttributeName text={'Availability Zone'} />
      <input />
      <AttributeName text={'Instance Name'} />
      <input type='text' value={instanceName} onChange={handleInstanceNameChange} />
      <AttributeName text={'Security Group Type'} />
      <select value={securityGroupType} onChange={handleSecurityGroupTypeChange}>
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
