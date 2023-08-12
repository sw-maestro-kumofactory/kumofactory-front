'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import EnvironmentVariableComponent from '@/src/components/DeployComponent/Application/ProjectSetting/EnvironmentVariableComponent';
import { getOrgRepoBranches, getRepoBranches, postDeploy } from '@/src/api/deploy';
import { DeployRequest } from '@/src/types/Deploy';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';
import ConfirmPopover from '@/src/components/common/Popover/ConfirmPopover';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';

const Setting = () => {
  const params = useParams();
  const { currentBlueprintId, repoId, userName } = params;
  const router = useRouter();
  const environmentVariables = useDeployStore((state) => state.environmentVariables);
  const targetInstanceName = useDeployStore((state) => state.targetInstanceName);
  const username = useLoginStore((state) => state.username);

  const [language, setLanguage] = useState<string>('');
  const [curBranch, setCurBranch] = useState<string>('');
  const [branches, setBranches] = useState<string[]>([]);

  const onClickDeployButton = async () => {
    const data: DeployRequest = {
      targetInstance: 'i-02b5064a1e36be086',
      user: username,
      repo: repoId,
      language: language,
      branch: curBranch,
      env: environmentVariables,
    };
    try {
      const d = postDeploy(data);
      alert('deploy Success!');
    } catch (e) {
      alert('deploy Fail!');
    }
  };

  const getBranchList = async () => {
    try {
      let d: string[] = [];
      if (userName === username) {
        d = await getRepoBranches(userName, repoId);
      } else {
        d = await getOrgRepoBranches(userName, repoId);
      }
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
    <div className='w-full h-full flex flex-col items-center '>
      <div className='w-11/12 h-full flex flex-col p-8'>
        <div className=' flex justify-between items-center'>
          <div className='text-gray-600 cursor-pointer' onClick={() => router.back()}>
            back
          </div>
          <ConfirmPopover
            Heading={'Application Deploy'}
            Description={'Your Repository will be Deployed Selected Instance'}
            onClickConfirm={() => {
              //   TODO: Deploy API 호출
              // onClickDeployButton();
            }}
          >
            <div className='p-4 bg-[#799ACF] text-white rounded-md cursor-pointer'>Deploy</div>
          </ConfirmPopover>
        </div>
        <div className='text-lg pb-4'>Current Repository : {repoId}</div>
        <div className='text-lg pb-4'>Current Target Instance : {targetInstanceName}</div>
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
        <div className='text-lg py-4'>Select Framework</div>
        <div className='flex gap-x-4'>
          <div
            className='cursor-pointer'
            onClick={() => {
              setLanguage('java');
            }}
          >
            <input type='radio' name='language' value='java' id='java' />
            <label htmlFor='java'>Spring</label>
          </div>
          <div
            className='cursor-pointer'
            onClick={() => {
              setLanguage('node');
            }}
          >
            <input type='radio' name='language' value='node' id='node' />
            <label htmlFor='node'>Express</label>
          </div>
        </div>
        <EnvironmentVariableComponent />
      </div>
    </div>
  );
};

export default Setting;
