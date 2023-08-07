'use client';
import { useEffect, useState } from 'react';

import RepositoryContainer from '@/src/components/DeployComponent/Application/Repository/RepositoryContainer';
import { getOrgRepositories, getUserRepositories } from '@/src/api/deploy';
import { PersonalRepo } from '@/src/types/Deploy';
import useDeployStore from '@/src/hooks/Store/ApplicationDeploy/useDeployStore';
import SqlUploader from '@/src/components/DeployComponent/RDS/SqlUploader';

const DeployComponent = () => {
  const targetInstanceType = useDeployStore((state) => state.targetInstanceType);
  const [isRepo, setIsRepo] = useState(true);
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

  useEffect(() => {
    getRepo();
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
      <div className='w-4/5 h-full'>
        <div className='pb-4 text-2xl'>Repositories</div>
        <div className=' pb-4 text-md text-gray-500'>Select Repository to Deploy</div>
        {Object.keys(data).map((key) => {
          return <RepositoryContainer key={key} repoInfo={data[key]} id={key} />;
        })}
      </div>
    </div>
  );
};

export default DeployComponent;
