import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';

const Templates = () => {
  return (
    <div className='w-3/4 h-5/6 bg-white rounded-2xl p-8'>
      <div className='text-2xl'>Templates</div>
      <div className='text-md mt-4 text-gray-600'>Create New Architecture or Select Template!</div>
      <div className='flex flex-wrap w-full h-[95%] overflow-y-scroll mt-4 '>
        <div className='w-1/3 h-2/5 py-4'>
          <Link
            className='flex flex-col items-center justify-center w-full h-5/6 text-sky-700 bg-gray-200 border-4 hover:border-sky-700 rounded-2xl cursor-pointer'
            href='/blueprint/empty'
          >
            <FontAwesomeIcon icon={faSquarePlus} className='text-4xl mb-4' />
            New BluePrint
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Templates;
