'use client';
import React, { useEffect, useState } from 'react';

import RepositoryContainer from '@/src/components/DeployComponent/Application/Repository/RepositoryContainer';
import { getOrgRepositories, getUserRepositories } from '@/src/api/deploy';
import { PersonalRepoResponse } from '@/src/types/Deploy';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import SqlUploader from '@/src/components/DeployComponent/RDS/SqlUploader';
import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';
import SkeletonRepositoryContainer from '@/src/components/DeployComponent/Application/Repository/SkeletonRepositoryContainer';

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
      <div className='w-full h-full  pl-[294px] flex justify-center items-center text-4xl -mt-12'>
        Select Target Instance First!
      </div>
    );
  }

  if (targetInstanceType === 'RDS') {
    return <SqlUploader />;
  }

  return (
    <div className='w-full h-full pl-[294px] flex flex-col p-8 overflow-y-scroll items-center'>
      <div className='w-11/12 h-full'>
        <div className='pb-4 text-2xl '>
          <div>Instance Info</div>
          <div className='pl-2 text-sm'>Instance ID : {deployedResourceList[targetInstanceId].instanceId}</div>
          <div className='pl-2 text-sm'>Instance Name : {deployedResourceList[targetInstanceId].instanceName}</div>
          <div className='pl-2 text-sm'>Instance Private IP : {deployedResourceList[targetInstanceId].privateIp}</div>
        </div>
        <div className='pb-4 text-2xl'>Repositories</div>
        <div className=' pb-4 text-md text-gray-500'>Select Repository to Deploy</div>
        {isLoading && (
          <>
            <SkeletonRepositoryContainer />
            <SkeletonRepositoryContainer />
          </>
        )}
        {!isLoading &&
          Object.keys(repositoryList).map((key) => {
            return <RepositoryContainer key={key} repoInfo={repositoryList[key]} id={key} />;
          })}
      </div>
    </div>
  );
};

export default DeployComponent;
