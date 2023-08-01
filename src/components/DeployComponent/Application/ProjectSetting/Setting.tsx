'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import EnvironmentVariableComponent from '@/src/components/DeployComponent/Application/ProjectSetting/EnvironmentVariableComponent';
import { getBranches, postDeploy } from '@/src/api/deploy';
import { DeployRequest } from '@/src/types/Deploy';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';

interface IProps {
  id: string;
}
const Setting = ({ id }: IProps) => {
  const router = useRouter();
  const environmentVariables = useDeployStore((state) => state.environmentVariables);
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);
  const [curBranch, setCurBranch] = useState<string>('');
  const [branches, setBranches] = useState<string[]>([]);

  const onClickDeployButton = () => {
    const data: DeployRequest = {
      targetInstance: 'i-02b5064a1e36be086',
      user: 'higeuni',
      repo: id,
      language: 'node',
      branch: curBranch,
      env: environmentVariables,
    };
    const d = postDeploy(data);
    console.log(d);
  };

  const getBranchList = async () => {
    try {
      const d = await getBranches('higeuni', id);
      setBranches(d);
      setCurBranch(d[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBranchList();
  }, []);

  return (
    <div className='w-full h-full flex flex-col p-8'>
      <div className='flex justify-between items-center'>
        <div className='text-gray-600 cursor-pointer' onClick={() => router.back()}>
          back
        </div>
        <div className='p-4 bg-[#799ACF] text-white rounded-md cursor-pointer' onClick={onClickDeployButton}>
          Deploy
        </div>
      </div>
      <div className='text-lg pb-4'>Current Repository : {id}</div>
      <div className='text-lg pb-4'>Current Target Instance : {targetInstanceId}</div>
      <div className='text-lg pb-4'>Select Branch to deploy</div>
      <select
        className='w-1/2 h-8 border border-gray-300 rounded-md'
        value={curBranch}
        onChange={(e) => {
          setCurBranch(e.target.value);
        }}
      >
        {branches.map((branch) => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </select>
      <EnvironmentVariableComponent />
    </div>
  );
};

export default Setting;
