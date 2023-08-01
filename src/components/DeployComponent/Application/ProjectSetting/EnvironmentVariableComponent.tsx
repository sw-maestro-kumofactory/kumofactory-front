'use client';

import { useState } from 'react';

import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import useInput from '@/src/hooks/useInput';

const EnvironmentVariableComponent = () => {
  const EnvironmentVariables = useDeployStore((state) => state.environmentVariables);
  const setEnvironmentVariables = useDeployStore((state) => state.DeployAction.setEnvironmentVariables);
  const updateEnvironmentVariables = useDeployStore((state) => state.DeployAction.updateEnvironmentVariables);
  const removeEnvironmentVariables = useDeployStore((state) => state.DeployAction.removeEnvironmentVariables);
  const { value: key, setValue: setKey, onHandleChange: onKeyChange } = useInput<string>('');
  const { value: value, setValue, onHandleChange: onValueChange } = useInput<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null); // State variable to keep track of the index being edited
  const [editedKey, setEditedKey] = useState<string>('');
  const [editedValue, setEditedValue] = useState<string>('');

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

  const handleEditEnvironmentVariables = (index: number) => {
    setEditIndex(index);
  };

  const handleUpdateEnvironmentVariables = () => {
    const updatedVariable = {
      key: editedKey,
      value: editedValue,
    };
    updateEnvironmentVariables(updatedVariable, editIndex!);
    setEditIndex(null);
    setKey('');
    setValue('');
  };

  return (
    <div className='w-full mt-4'>
      <div className='text-lg font-bold mb-4'>Add Environment Variable</div>
      <div className='flex bg-amber-100 p-4'>
        <input className='w-1/3 mr-4 p-4 rounded-2xl' placeholder='key' value={key} onChange={onKeyChange} />
        <input className='w-1/3 p-4 rounded-2xl mr-12' placeholder='value' value={value} onChange={onValueChange} />
        <div className='w-1/6 p-4 rounded-2xl bg-amber-300 cursor-pointer' onClick={handleAddEnvironmentVariables}>
          Add
        </div>
      </div>
      <div className='text-lg font-bold my-4'>Environment Variables</div>
      <div>
        {EnvironmentVariables.map((variable, index) => (
          <div key={index} className='flex bg-amber-100 p-4'>
            <input
              className='w-2/5 mr-4 p-4 rounded-2xl'
              value={editIndex === index ? editedKey : variable.key}
              onChange={(e) => setEditedKey(e.target.value)} // Store the temporary edited key in editedKey state
              disabled={editIndex !== index}
            />
            <input
              className='w-2/5 p-4 rounded-2xl mr-12'
              value={editIndex === index ? editedValue : variable.value}
              onChange={(e) => setEditedValue(e.target.value)} // Store the temporary edited value in editedValue state
              disabled={editIndex !== index}
            />
            <div
              className='w-fit p-4 rounded-2xl bg-amber-300 cursor-pointer mr-4'
              onClick={() => {
                if (editIndex === index) {
                  handleUpdateEnvironmentVariables();
                } else {
                  setEditedKey(variable.key);
                  setEditedValue(variable.value);
                  handleEditEnvironmentVariables(index);
                }
              }}
            >
              {editIndex === index ? 'Save' : 'Edit'}
            </div>
            <div
              className='w-fit p-4 rounded-2xl bg-amber-300 cursor-pointer'
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

export default EnvironmentVariableComponent;
