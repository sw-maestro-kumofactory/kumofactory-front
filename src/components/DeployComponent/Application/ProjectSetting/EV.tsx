'use client';

import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import useInput from '@/src/hooks/useInput';

const EV = () => {
  const EnvironmentVariables = useDeployStore((state) => state.EnvironmentVariables);
  const setEnvironmentVariables = useDeployStore((state) => state.DeployAction.setEnvironmentVariables);
  const removeEnvironmentVariables = useDeployStore((state) => state.DeployAction.removeEnvironmentVariables);
  const { value: key, setValue: setKey, onHandleChange: onKeyChange } = useInput<string>('');
  const { value: value, setValue, onHandleChange: onValueChange } = useInput<string>('');

  const handleAddEnvironmentVariables = (e: React.MouseEvent) => {
    e.preventDefault();
    const newVariable = {
      key: key,
      value: value,
    };
    setKey('');
    setValue('');
    setEnvironmentVariables(newVariable);
  };

  const handleDeleteEnvironmentVariables = (key: string) => {
    removeEnvironmentVariables(key);
  };

  return (
    <div className='w-full '>
      <div className='text-xl font-bold mb-4'>Add Environment Variable</div>
      <div className='flex bg-amber-100 p-4'>
        <input className='w-1/3 mr-4 p-4 rounded-2xl' placeholder='key' value={key} onChange={onKeyChange} />
        <input className='w-1/3 p-4 rounded-2xl mr-12' placeholder='value' value={value} onChange={onValueChange} />
        <div className='w-1/6 p-4 rounded-2xl bg-amber-300 cursor-pointer' onClick={handleAddEnvironmentVariables}>
          Add
        </div>
      </div>
      <div className='text-xl font-bold my-4'>Environment Variables</div>
      <div>
        {EnvironmentVariables.map((variable, index) => (
          <div key={index} className='flex bg-amber-100 p-4'>
            <div className='w-1/3 mr-4 p-4 rounded-2xl'>{variable.key}</div>
            <div className='w-1/3 p-4 rounded-2xl mr-12'>{variable.value}</div>
            <div
              className='w-1/6 p-4 rounded-2xl bg-amber-300 cursor-pointer'
              onClick={() => {
                handleDeleteEnvironmentVariables(variable.key);
              }}
            >
              Delete
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EV;
