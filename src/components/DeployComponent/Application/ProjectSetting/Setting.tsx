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
import useInput from '@/src/hooks/useInput';

const Setting = () => {
  const params = useParams();
  const { currentBlueprintId, repoId, userName } = params;
  const router = useRouter();
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);
  const environmentVariables = useDeployStore((state) => state.environmentVariables);
  const targetInstanceName = useDeployStore((state) => state.targetInstanceName);
  const username = useLoginStore((state) => state.username);
  const deployedResourceList = useDeployStore((state) => state.deployedResourceList);

  const [language, setLanguage] = useState<string>('');
  const [curBranch, setCurBranch] = useState<string>('');
  const [branches, setBranches] = useState<string[]>([]);
  const [isEtc, setIsEtc] = useState<boolean>(false);
  const { value: dockerFilePath, onHandleChange: onChangeDockerFilePath } = useInput('');

  const onClickDeployButton = async () => {
    // if (dockerFilePath === '' || !language) {
    //   alert('You should select dockerFilePath of framework');
    //   return;
    // }

    const data: DeployRequest = {
      targetInstance: deployedResourceList[targetInstanceId!].instanceId,
      user: username,
      repo: repoId,
      language: language,
      branch: curBranch,
      env: environmentVariables[repoId],
    };
    // console.log(data);
    try {
      const d = await postDeploy(data);
      const reader = d.body.pipeThrough(new TextDecoderStream()).getReader();
      console.log(reader);
      while (true) {
        const { value, done } = await reader.read();
        console.log(value);
        if (done) break;
        console.log('Received', value);
      }
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

  // useEffect(() => {
  //   const source = new EventSource(`/api/build/buildStatus/i-020762bcb5322ef4e`);
  //
  //   source.addEventListener('open', () => {
  //     console.log('SSE opened!');
  //   });
  //
  //   source.addEventListener('status', (e) => {
  //     console.log(e.data);
  //   });
  //   source.addEventListener('message', (e) => {
  //     console.log(e.data);
  //   });
  //   source.addEventListener('success', (e) => {
  //     console.log(e.data);
  //   });
  //
  //   source.addEventListener('error', (e) => {
  //     console.error('Error: ', e);
  //   });
  //
  //   return () => {
  //     source.close();
  //   };
  // }, []);

  return (
    <div className='w-full h-full pl-[294px] flex flex-col items-center overflow-y-scroll'>
      <div className='w-11/12 h-full flex flex-col py-4 px-8'>
        <div className=' flex justify-between items-center'>
          <div className='text-gray-600 cursor-pointer' onClick={() => router.back()}>
            back
          </div>
          <ConfirmPopover
            Heading={'Application Deploy'}
            Description={'Your Repository will be Deployed Selected Instance'}
            onClickConfirm={() => {
              onClickDeployButton();
            }}
          >
            <div className='p-4 bg-white border-solid border-2 border-[#799ACF] text-[#799ACF] rounded-xl cursor-pointer'>
              Deploy
            </div>
          </ConfirmPopover>
        </div>
        <div className='w-full text-lg p-2 mt-4 bg-[#799ACF] rounded-md text-white'>Current Information</div>
        <div className='py-4 px-2'>
          <div className=' pb-4'>Current Repository : {repoId}</div>
          <div className=''>Current Target Instance : {targetInstanceName}</div>
        </div>
        <div className='w-full text-lg p-2 bg-[#799ACF] rounded-md text-white'>Select Branch To Deploy</div>
        <div className='py-4 mx-2'>
          <select
            className='w-1/2 p-4 border border-gray-300 rounded-md'
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
        </div>
        {/* Framework */}
        <div className='w-full text-lg p-2 bg-[#799ACF] rounded-md text-white'>Deploy Option</div>
        <div className='mt-4 text-[#195091]'>
          For Application Deploy, You should select framework or input dockerfile path.
        </div>
        <div className='py-4 px-2'>
          <div className='font-bold'>Select Framework</div>
          <div className='flex gap-x-8 text-sm'>
            <div
              onClick={() => {
                setIsEtc(false);
                setLanguage('java');
              }}
            >
              <input className='m-2' type='radio' name='language' value='java' id='java' />
              <label htmlFor='java'>Spring</label>
            </div>
            <div
              onClick={() => {
                setIsEtc(false);
                setLanguage('node');
              }}
            >
              <input className='m-2' type='radio' name='language' value='node' id='node' />
              <label htmlFor='node'>Express</label>
            </div>
            <div
              onClick={() => {
                setIsEtc(true);
                setLanguage('');
              }}
            >
              <input className='m-2' type='radio' name='language' value='etc' id='etc' />
              <label htmlFor='etc'>dockerfile path</label>
            </div>
          </div>
          {isEtc && (
            <>
              <hr className='my-4 w-1/2' />
              <div className='font-bold mb-2'>Dockerfile Path</div>
              <input
                className='p-2 rounded-lg w-1/2 text-sm'
                value={dockerFilePath}
                onChange={onChangeDockerFilePath}
                placeholder='ex) /dockerfile'
              />
            </>
          )}
        </div>
        {/* Environment Variable */}
        <EnvironmentVariableComponent />
      </div>
    </div>
  );
};

export default Setting;
