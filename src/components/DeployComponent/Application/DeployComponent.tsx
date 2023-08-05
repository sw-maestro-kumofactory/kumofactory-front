'use client';
import { useEffect, useState } from 'react';

import RepositoryContainer from '@/src/components/DeployComponent/Application/Repository/RepositoryContainer';
import { getOrgRepositories, getUserRepositories } from '@/src/api/deploy';
import { PersonalRepo } from '@/src/types/Deploy';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';

const DeployComponent = () => {
  const [isRepo, setIsRepo] = useState(true);
  const targetInstanceId = useDeployStore((state) => state.targetInstanceId);
  const [data, setData] = useState<Record<string, PersonalRepo[]>>({});

  const getRepo = async () => {
    try {
      const d = await getUserRepositories('higeuni');
      setData({ ...data, higeuni: d.repoInfo });
      d.orgList.map(async (org) => {
        const orgRepo = await getOrgRepositories(org);
        setData({ ...data, [org]: orgRepo.repoInfo });
      });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(data);

  useEffect(() => {
    getRepo();
  }, []);

  if (!targetInstanceId) {
    return (
      <div className='w-full h-full flex justify-center items-center text-4xl -mt-12'>
        Select Target Instance First!
      </div>
    );
  }

  return (
    <div className='w-full h-full flex flex-col p-8 overflow-y-scroll'>
      <div className='pb-4'>Repositories</div>
      {Object.keys(data).map((key) => {
        return <RepositoryContainer key={key} repoInfo={data[key]} id={key} />;
      })}
    </div>
  );
};

export default DeployComponent;
