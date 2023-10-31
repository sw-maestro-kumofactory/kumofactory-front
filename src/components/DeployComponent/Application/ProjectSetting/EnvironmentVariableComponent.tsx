'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'next/navigation';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import useInput from '@/src/hooks/useInput';

const EnvironmentVariableComponent = () => {
  const { repoId } = useParams();
  const EnvironmentVariables = useDeployStore((state) => state.environmentVariables);
  const addEnvironmentVariables = useDeployStore((state) => state.DeployAction.addEnvironmentVariables);
  const updateEnvironmentVariables = useDeployStore((state) => state.DeployAction.updateEnvironmentVariables);
  const removeEnvironmentVariables = useDeployStore((state) => state.DeployAction.removeEnvironmentVariables);
  const { value: key, setValue: setKey, onHandleChange: onKeyChange } = useInput<string>('');
  const { value: value, setValue, onHandleChange: onValueChange } = useInput<string>('');
  const [editIndex, setEditIndex] = useState<number | null>(null); // State variable to keep track of the index being edited
  const [editedKey, setEditedKey] = useState<string>('');
  const [editedValue, setEditedValue] = useState<string>('');
  const [eyeIndex, setEyeIndex] = useState<number | null>(null);

  const handleAddEnvironmentVariables = (e: React.MouseEvent) => {
    e.preventDefault();
    const newVariable = {
      key: key,
      value: value,
    };
    setKey('');
    setValue('');
    addEnvironmentVariables(repoId, newVariable);
  };

  const handleDeleteEnvironmentVariables = (key: string) => {
    removeEnvironmentVariables(repoId, key);
  };

  const handleEditEnvironmentVariables = (index: number) => {
    setEditIndex(index);
  };

  const handleUpdateEnvironmentVariables = () => {
    const updatedVariable = {
      key: editedKey,
      value: editedValue,
    };
    updateEnvironmentVariables(repoId, updatedVariable, editIndex!);
    setEditIndex(null);
    setKey('');
    setValue('');
  };

  const onClickEye = (id: number) => {
    setEyeIndex(eyeIndex === null ? id : null);
  };

  return (
    <>
      <div className='w-full text-xl mt-7 pb-4 font-bold'>Add Environmental Variable</div>
      <div className='flex py-4 h-[117px] px-6 mb-7 gap-x-3 justify-between items-center border border-[#DAE2EC] rounded-md bg-white'>
        <div className='w-[394px] '>
          <div className='w-full mb-4 rounded-2xl text-base font-bold'>Key</div>
          <input
            className='w-full py-1.5 px-4 border border-[#DAE2EC] rounded-md text-[15px] font-semibold'
            placeholder='key'
            value={key}
            onChange={onKeyChange}
          />
        </div>
        <div className='w-[394px]'>
          <div className='w-full mr-4 mb-4 rounded-2xl text-base font-bold'>Value</div>
          <input
            className='w-full py-1.5 px-4 border border-[#DAE2EC] rounded-md text-[15px] font-semibold'
            placeholder='value'
            value={value}
            onChange={onValueChange}
          />
        </div>
        <div className='mr-4 mt-8 rounded-2xl cursor-pointer' onClick={handleAddEnvironmentVariables}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
      {EnvironmentVariables[repoId].length !== 0 && (
        <>
          <div className='w-full text-xl mb-4 font-bold'>Variable List</div>
        </>
      )}
      <div>
        {EnvironmentVariables[repoId].map((variable, index) => (
          <div key={index} className='flex items-center py-4 px-6 mb-10 border border-[#DAE2EC] rounded-md'>
            <input
              className={`w-[394px] mr-4 p-4 rounded-2xl bg-white
              border border-[#DAE2EC] 
              ${editIndex === index ? 'ring-2 ring-inset inset-black' : ''}`}
              value={editIndex === index ? editedKey : variable.key}
              onChange={(e) => setEditedKey(e.target.value)} // Store the temporary edited key in editedKey state
              disabled={editIndex !== index}
            />
            <div
              className={`w-[394px] mr-4 p-4 rounded-2xl bg-white flex items-center justify-between
              border border-[#DAE2EC] 
              ${editIndex === index ? 'ring-2 ring-inset inset-black' : ''}`}
            >
              <input
                className={`w-full bg-white `}
                type={editIndex !== index && eyeIndex !== index ? 'password' : 'text'}
                value={editIndex === index ? editedValue : variable.value}
                onChange={(e) => setEditedValue(e.target.value)} // Store the temporary edited value in editedValue state
                disabled={editIndex !== index}
              />

              <FontAwesomeIcon
                className='cursor-pointer'
                onClick={() => {
                  onClickEye(index);
                }}
                icon={eyeIndex === index ? faEyeSlash : faEye}
              />
            </div>
            <div
              className='flex justify-center rounded-2xl cursor-pointer mr-4 '
              onClick={() => {
                if (editIndex === index) {
                  handleUpdateEnvironmentVariables();
                  setEyeIndex(null);
                } else {
                  setEditedKey(variable.key);
                  setEditedValue(variable.value);
                  handleEditEnvironmentVariables(index);
                }
              }}
            >
              <FontAwesomeIcon icon={editIndex === index ? faFloppyDisk : faPenToSquare} />
            </div>
            <div
              className='rounded-2xl  cursor-pointer'
              onClick={() => {
                handleDeleteEnvironmentVariables(variable.key);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EnvironmentVariableComponent;
