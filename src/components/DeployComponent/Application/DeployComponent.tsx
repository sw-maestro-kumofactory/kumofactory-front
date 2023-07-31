'use client';
import { useState } from 'react';

import RepositoryContainer from '@/src/components/DeployComponent/Application/Repository/RepositoryContainer';

const DeployComponent = () => {
  const [isRepo, setIsRepo] = useState(true);
  return (
    <div className='w-full h-full flex flex-col p-8 overflow-y-scroll'>
      <div className='pb-4'>Repositories</div>
      <RepositoryContainer />
      <RepositoryContainer />
    </div>
  );
};

export default DeployComponent;
