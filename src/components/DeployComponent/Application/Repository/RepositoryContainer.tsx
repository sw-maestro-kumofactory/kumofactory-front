'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import Repository from '@/src/components/DeployComponent/Application/Repository/Repository';
import { PersonalRepo } from '@/src/types/Deploy';
import { getUserRepositories } from '@/src/api/deploy';

interface IProps {
  isUser?: boolean;
  id: string;
  repoInfo: PersonalRepo[];
}

const RepositoryContainer = ({ id, repoInfo }: IProps) => {
  return (
    <div className='w-full h-3/5 pb-8 '>
      <div className='flex items-center py-8 px-4 gap-x-4 h-12 bg-blue-100 w-full rounded-t-xl'>
        <Image
          src='https://avatars.githubusercontent.com/u/59858440?v=4'
          className='rounded-full'
          width='30'
          height='30'
          alt={'GRAVATAR'}
        />
        <div>{id}</div>
      </div>
      <div className='bg-white h-4/5 rounded-b-xl overflow-y-scroll'>
        {repoInfo.map((repo, index) => (
          <Repository key={repo.fullName} id={repo.name} name={repo.name} />
        ))}
      </div>
    </div>
  );
};

export default RepositoryContainer;
