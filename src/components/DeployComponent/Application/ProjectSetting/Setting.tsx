'use client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRocket } from '@fortawesome/free-solid-svg-icons';

import EnvironmentVariableComponent from '@/src/components/DeployComponent/Application/ProjectSetting/EnvironmentVariableComponent';
import { getOrgRepoBranches, getRepoBranches, postDeploy } from '@/src/api/deploy';
import { DeployRequest } from '@/src/types/Deploy';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';
import ConfirmPopover from '@/src/components/common/Popover/ConfirmPopover';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import useInput from '@/src/hooks/useInput';
import CustomList from '@/src/components/common/List/CustomList';
import DeployConfirmModal from '@/src/components/common/Modal/DeployConfirmModal';

const Setting = () => {
  const params = useParams();
  const { currentBlueprintId, repoId, userName } = params;
  const router = useRouter();
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);
  const environmentVariables = useDeployStore((state) => state.environmentVariables);
  const targetInstanceName = useDeployStore((state) => state.targetInstanceName);
  const username = useLoginStore((state) => state.username);
  const deployedResourceList = useDeployStore((state) => state.deployedResourceList);
  const addDeployStatusOfResource = useDeployStore((state) => state.DeployAction.addDeployStatusOfResource);

  const [language, setLanguage] = useState<string>('');
  const [curBranch, setCurBranch] = useState<string>('');
  const [branches, setBranches] = useState<string[]>([]);
  const [isEtc, setIsEtc] = useState<boolean>(false);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const { value: dockerFilePath, onHandleChange: onChangeDockerFilePath } = useInput('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickDeployButton = async () => {
    const data: DeployRequest = {
      targetInstance: deployedResourceList[targetInstanceId!].instanceId,
      user: username,
      repo: repoId,
      language: language,
      branch: curBranch,
      env: environmentVariables[repoId],
    };

    try {
      const d = await postDeploy(data);
      setIsDeploying(true);
      alert('deploy Started! You can check the status in the Deploy List page.');
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
    const source = new EventSource(`/api/build/buildStatus/${deployedResourceList[targetInstanceId!].instanceId}`);
    source.addEventListener('open', () => {});
    source.addEventListener('status', (e) => {
      if (e.data === 'success' || e.data === 'fail') {
        if (deployedResourceList[targetInstanceId!].deployStatus !== 'success') {
          alert(e.data);
          addDeployStatusOfResource(targetInstanceId!, e.data);
        }
        source.close();
      }
    });
    source.addEventListener('error', (e) => {});
    return () => {
      if (source) source.close();
    };
  }, []);

  useEffect(() => {
    getBranchList();
  }, []);

  return (
    <div className='w-full h-full pl-[294px] bg-[#F9FBFC] overflow-y-scroll'>
      <div className='absolute flex gap-x-2 items-center cursor-pointer ml-7 pt-4' onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <div>back</div>
      </div>
      <div className='w-full h-full mt-7 flex flex-col items-center py-4 px-8'>
        <div className='w-[920px] text-[#323438]'>
          <div className='flex justify-between items-center'>
            <div className='text-3xl font-semibold'>Settings</div>
            <div
              className='flex items-center justify-center gap-x-1 px-3 py-2 text-sm bg-[#00CBBF] text-white rounded-md cursor-pointer hover:bg-[#00C0B5]'
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faRocket} />
              {isDeploying ? 'Deploying' : 'Deploy'}
            </div>
          </div>
          <div className='w-full text-xl mt-7 font-bold'>Current Information</div>
          <div className='border border-[#DAE2EC] rounded-md mt-4 py-5 px-4 bg-white'>
            <ul className='pl-4 list-disc leading-8'>
              <CustomList title='User' content={username} />
              <CustomList title='Repository' content={repoId} />
              <CustomList title='Selected Instance' content={targetInstanceName!} />
            </ul>
          </div>
          <div className='w-full text-xl mt-7 font-bold'>Select Branch To Deploy</div>
          <div className='p-6 mt-4 border border-[#DAE2EC] rounded-md bg-white'>
            <select
              className='w-full p-1 px-2 border border-gray-300 rounded-md text-base'
              value={curBranch}
              onChange={(e) => {
                setCurBranch(e.target.value);
              }}
            >
              {branches.map((branch) => (
                <option className='bg-white' key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full text-xl mt-7 font-bold'>Select Framework</div>
          <div className='mt-4 text-[#00CBBF]'>
            For Application Deploy, You should select framework or input dockerfile path.
          </div>
          <div className='py-4 px-2'>
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
          <EnvironmentVariableComponent />
        </div>
      </div>
      <DeployConfirmModal onClick={onClickDeployButton} show={isOpen} setShow={setIsOpen} />
    </div>
  );
};

export default Setting;
