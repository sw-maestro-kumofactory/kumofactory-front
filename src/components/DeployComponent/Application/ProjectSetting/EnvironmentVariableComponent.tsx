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
    <div className='w-full'>
      <div className='w-full text-lg p-2 bg-[#799ACF] rounded-md text-white'>Add Environmental Variable</div>
      <div className='flex py-4 justify-between items-center'>
        <div className='w-5/12'>
          <div className='w-full px-4 mb-4 rounded-2xl'>Key</div>
          <input className='w-full p-4 rounded-2xl' placeholder='key' value={key} onChange={onKeyChange} />
        </div>
        <div className='w-5/12'>
          <div className='w-full mr-4 px-4 mb-4 rounded-2xl'>Value</div>
          <input className='w-full p-4 rounded-2xl mr-12' placeholder='value' value={value} onChange={onValueChange} />
        </div>
        <div
          className='p-4 h-fit mr-4 rounded-2xl border-solid border-2 border-gray-400 cursor-pointer'
          onClick={handleAddEnvironmentVariables}
        >
          Add
        </div>
      </div>
      <div className='w-full text-lg p-2 bg-[#799ACF] rounded-md text-white'>Variable List</div>
      {EnvironmentVariables.length !== 0 && (
        <div className='w-full flex px-4 py-2'>
          <div className='w-5/12 mr-5'>Key</div>
          <div className='w-5/12'>Value</div>
        </div>
      )}
      <div>
        {EnvironmentVariables.map((variable, index) => (
          <div key={index} className='flex mb-4'>
            <input
              className={`w-5/12 mr-4 p-4 rounded-2xl bg-white ${
                editIndex === index ? 'ring-2 ring-inset inset-blue-500' : ''
              }`}
              value={editIndex === index ? editedKey : variable.key}
              onChange={(e) => setEditedKey(e.target.value)} // Store the temporary edited key in editedKey state
              disabled={editIndex !== index}
            />
            <input
              className={`w-5/12 mr-4 p-4 rounded-2xl bg-white ${
                editIndex === index ? 'ring-2 ring-inset inset-blue-500' : ''
              }`}
              value={editIndex === index ? editedValue : variable.value}
              onChange={(e) => setEditedValue(e.target.value)} // Store the temporary edited value in editedValue state
              disabled={editIndex !== index}
            />
            <div
              className='flex justify-center w-20 p-4 rounded-2xl cursor-pointer mr-4 bg-white'
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
              className='w-fit p-4 rounded-2xl bg-white cursor-pointer'
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
