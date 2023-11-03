import Image from 'next/image';

const SkeletonRepositoryContainer = () => {
  return (
    <div className='w-full h-[640px] pb-8 mb-12'>
      <div className='flex items-center py-8 gap-x-4 h-12 w-full rounded-t-xl'>
        <div className='flex items-center px-6 py-3 gap-x-4 w-full rounded-t-xl bg-gray-100'>
          <div className='min-w-[32px] min-h-[32px] rounded-full bg-gray-300 animate-pulse'></div>
          <div className='min-w-[200px] min-h-[32px] bg-gray-300 animate-pulse'></div>
        </div>
      </div>
      <div className='bg-white h-[544px] rounded-b-xl overflow-y-scroll flex flex-col items-center py-6 gap-y-3'>
        {Array.from({ length: 5 }).map((_, index) => (
          <div className='w-[868px] p-4 border-[#DAE2EC] border rounded-md'>
            <div className='flex items-center gap-x-5'>
              <div className='text-lg w-36 h-5 cursor-pointer bg-gray-300 animate-pulse'></div>
              <div className='flex items-center text-[#81929F] gap-x-1'>
                <div className='w-20 h-6 bg-gray-300 animate-pulse'></div>
              </div>
            </div>
            <div className='mt-3 w-full h-6 bg-gray-300 animate-pulse'></div>
            <div className='flex items-center mt-2 gap-x-3 w-96 h-6 bg-gray-300 animate-pulse'></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonRepositoryContainer;
