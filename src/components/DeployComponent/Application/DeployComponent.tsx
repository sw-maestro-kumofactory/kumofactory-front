'use client';
import React, { useEffect, useState } from 'react';

import RepositoryContainer from '@/src/components/DeployComponent/Application/Repository/RepositoryContainer';
import { getOrgRepositories, getUserRepositories } from '@/src/api/deploy';
import { PersonalRepoResponse } from '@/src/types/Deploy';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import SqlUploader from '@/src/components/DeployComponent/RDS/SqlUploader';
import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';
import SkeletonRepositoryContainer from '@/src/components/DeployComponent/Application/Repository/SkeletonRepositoryContainer';
import CustomList from '@/src/components/common/List/CustomList';

//TODO : Environment Variable Design

const DeployComponent = () => {
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);
  const targetInstanceType = useDeployStore((state) => state.targetInstanceType);
  const repositoryList = useDeployStore((state) => state.repositoryList);
  const deployedResourceList = useDeployStore((state) => state.deployedResourceList);
  const { setRepositoryList, initEnvironmentVariables } = useDeployStore((state) => state.DeployAction);

  const username = useLoginStore((state) => state.username);
  const [isLoading, setIsLoading] = useState(true);

  const getRepo = async () => {
    try {
      const d = await getUserRepositories();
      const tmp: Record<string, PersonalRepoResponse[]> = {};
      if (d.repoCount > 0) {
        for (const repo of d.repoInfo) {
          initEnvironmentVariables(repo.name);
        }
        tmp[username] = d.repoInfo;
      }

      if (d.orgCount > 0) {
        const orgPromises = d.orgList.map(async (org) => {
          const orgRepo = await getOrgRepositories(org);
          return { org, orgRepo };
        });

        const orgResults = await Promise.all(orgPromises);
        orgResults.forEach(({ org, orgRepo }) => {
          orgRepo.forEach((repo) => {
            initEnvironmentVariables(repo.name);
          });
          tmp[org] = orgRepo;
        });
      }
      setRepositoryList(tmp);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (Object.keys(repositoryList).length === 0) {
      getRepo();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (!targetInstanceType || !targetInstanceId) {
    return (
      <div className='w-full h-full pl-[294px] flex justify-center items-center text-base bg-[#F9FBFC] -mt-12 text-[#B0BCC3]'>
        배포할 인스턴스, RDS를 먼저 선택해주세요!
      </div>
    );
  }

  return (
    <div className='w-full h-full pl-[294px] flex flex-col p-8 overflow-y-scroll items-center bg-[#f9fbfc]'>
      <div className='w-[920px] h-full '>
        <div className='pb-9 '>
          <div className='text-xl font-bold mb-4'>Instance Info</div>
          {deployedResourceList[targetInstanceId] && (
            <div className='bg-white'>
              <div className='w-full border-[#DAE2EC] border rounded-t-md'>
                <div className='text-base font-bold py-4 px-6'>
                  {deployedResourceList[targetInstanceId].instanceName}
                </div>
              </div>
              <div className='w-full border-[#DAE2EC] border rounded-b-md border-t-0'>
                <ul className='pl-8 list-disc leading-8 p-3 '>
                  <CustomList title='Private IP' content={deployedResourceList[targetInstanceId].privateIp} />
                  <CustomList title='Public IP' content={deployedResourceList[targetInstanceId].publicIp!} />
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className='text-xl font-bold mb-4'>Repositories</div>
        {isLoading && (
          <>
            <SkeletonRepositoryContainer />
            <SkeletonRepositoryContainer />
          </>
        )}
        {!isLoading &&
          Object.keys(repositoryList).map((key) => {
            return (
              <>
                <RepositoryContainer key={key} repoInfo={repositoryList[key]} id={key} />{' '}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default DeployComponent;
