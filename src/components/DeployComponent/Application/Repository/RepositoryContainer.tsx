'use client';
import { useState } from 'react';

import Repository from '@/src/components/DeployComponent/Application/Repository/Repository';

interface IProps {
  // InstanceId: string; -> 전역으로 관리하기
}

const RepositoryContainer = () => {
  const [repos, setRepos] = useState([]);

  return (
    <div className='w-full pb-8'>
      <div className='flex items-center p-8 gap-x-4 h-12 bg-blue-100 w-full rounded-t-xl'>
        <div>userImage</div>
        <div>UserName</div>
      </div>
      <div className='bg-white rounded-b-xl'>
        <Repository id='1' />
        <Repository id='2' />
        <Repository id='3' />
        <Repository id='4' />
      </div>
    </div>
  );
};

export default RepositoryContainer;
