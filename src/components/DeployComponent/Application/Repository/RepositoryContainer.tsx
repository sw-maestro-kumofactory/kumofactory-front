'use client';
import Image from 'next/image';

import Repository from '@/src/components/DeployComponent/Application/Repository/Repository';
import { PersonalRepo } from '@/src/types/Deploy';

interface IProps {
  id: string;
  repoInfo: PersonalRepo[];
}

const RepositoryContainer = ({ id, repoInfo }: IProps) => {
  return (
    <div className='w-full max-h-[600px] min-h-fit pb-8 mb-12'>
      <div className='flex items-center py-8 px-4 gap-x-4 h-12 bg-blue-100 w-full rounded-t-xl'>
        <Image
          src='https://avatars.githubusercontent.com/u/59858440?v=4'
          className='rounded-full'
          width='32'
          height='32'
          alt={'GRAVATAR'}
        />
        <div>{id}</div>
      </div>
      <div className='bg-white h-fit max-h-[552px] rounded-b-xl overflow-y-scroll'>
        {repoInfo.map((repo, index) => (
          <Repository key={repo.fullName} id={id} name={repo.name} />
        ))}
      </div>
    </div>
  );
};

export default RepositoryContainer;
