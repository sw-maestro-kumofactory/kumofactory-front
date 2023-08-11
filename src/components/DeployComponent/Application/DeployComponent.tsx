'use client';
import { useEffect, useState } from 'react';

import RepositoryContainer from '@/src/components/DeployComponent/Application/Repository/RepositoryContainer';
import { getOrgRepositories, getUserRepositories } from '@/src/api/deploy';
import { PersonalRepo } from '@/src/types/Deploy';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import SqlUploader from '@/src/components/DeployComponent/RDS/SqlUploader';
import Loading from '@/src/components/common/Loading';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';
import { useLoginStore } from '@/src/hooks/Store/auth/useLoginStore';

const DeployComponent = () => {
  const targetInstanceType = useDeployStore((state) => state.targetInstanceType);
  const repositoryList = useDeployStore((state) => state.repositoryList);
  const setRepositoryList = useDeployStore((state) => state.DeployAction.setRepositoryList);
  const username = useLoginStore((state) => state.username);
  const [isLoading, setIsLoading] = useState(true);

  const getRepo = async () => {
    try {
      const d = await getUserRepositories();
      const tmp: Record<string, PersonalRepo[]> = {};
      if (d.repoCount > 0) {
        tmp[username] = d.repoInfo;
      }

      if (d.orgCount > 0) {
        const orgPromises = d.orgList.map(async (org) => {
          const orgRepo = await getOrgRepositories(org);
          return { org, orgRepo };
        });

        const orgResults = await Promise.all(orgPromises);
        orgResults.forEach(({ org, orgRepo }) => {
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

  if (!targetInstanceType) {
    return (
      <div className='w-full h-full flex justify-center items-center text-4xl -mt-12'>
        Select Target Instance First!
      </div>
    );
  }

  if (targetInstanceType === 'RDS') {
    return <SqlUploader />;
  }

  return (
    <div className='w-full h-full flex flex-col p-8 overflow-y-scroll items-center'>
      <div className='w-11/12 h-full'>
        <div className='pb-4 text-2xl'>Repositories</div>
        <div className=' pb-4 text-md text-gray-500'>Select Repository to Deploy</div>
        {isLoading && <Loading />}
        {!isLoading &&
          Object.keys(repositoryList).map((key) => {
            return <RepositoryContainer key={key} repoInfo={repositoryList[key]} id={key} />;
          })}
      </div>
    </div>
  );
};

export default DeployComponent;
