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
    <div className='w-full max-h-[600px] min-h-fit pb-8 mb-12 '>
      <div className='flex items-center py-3 px-6 gap-x-4 border-[#DAE2EC] border bg-white rounded-t-md'>
        <Image
          src='https://avatars.githubusercontent.com/u/59858440?v=4'
          className='rounded-full'
          width='32'
          height='32'
          alt={'GRAVATAR'}
        />
        <div>{id}</div>
      </div>
      <div className='h-fit max-h-[552px] rounded-b-md overflow-y-scroll border-[#DAE2EC] border bg-white border-t-0 flex flex-col items-center py-6 gap-y-3'>
        {repoInfo.map((repo, index) => (
          <Repository key={repo.fullName} id={id} name={repo.name} />
        ))}
      </div>
    </div>
  );
};

export default RepositoryContainer;
