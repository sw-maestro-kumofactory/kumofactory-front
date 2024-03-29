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
    <div className='w-full max-h-[640px] min-h-fit pb-8'>
      <div className='flex items-center py-3 px-6 gap-x-4 border-[#DAE2EC] border bg-white rounded-t-md'>
        <img src={`https://github.com/${id}.png`} className='rounded-full w-8 h-8' alt={'GRAVATAR'} />
        <div>{id}</div>
      </div>
      <div className='h-fit max-h-[544px] rounded-b-md overflow-y-scroll border-[#DAE2EC] border bg-white border-t-0 flex flex-col items-center py-6 gap-y-3 '>
        {repoInfo.map((repo, index) => (
          <Repository key={repo.fullName} id={id} info={repo} />
        ))}
      </div>
    </div>
  );
};

export default RepositoryContainer;
