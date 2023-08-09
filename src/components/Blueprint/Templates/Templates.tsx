import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';

import NewBlueprint from '@/src/components/Blueprint/Templates/NewBlueprint';

const Templates = () => {
  return (
    <div className='w-3/4 h-5/6 bg-white rounded-2xl p-8'>
      <div className='text-2xl'>Templates</div>
      <div className='flex flex-wrap w-full h-[95%] overflow-y-scroll mt-4 '>
        <div className='w-1/3 h-2/5 p-4'>
          <NewBlueprint />
        </div>
      </div>
    </div>
  );
};

export default Templates;
