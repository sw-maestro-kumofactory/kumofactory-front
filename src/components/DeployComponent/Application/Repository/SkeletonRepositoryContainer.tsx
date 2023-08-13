const SkeletonRepositoryContainer = () => {
  return (
    <div className='w-full h-[600px] pb-8 mb-12'>
      <div className='flex items-center py-8 px-4 gap-x-4 h-12 bg-blue-100 w-full rounded-t-xl'>
        <div className='flex items-center py-8 px-4 gap-x-4 h-12 bg-blue-100 w-full rounded-t-xl'>
          <div className='min-w-[32px] min-h-[32px] rounded-full bg-gray-300 animate-pulse'></div>
          <div className='min-w-[200px] min-h-[32px] bg-gray-300 animate-pulse'></div>
        </div>
      </div>
      <div className='bg-white h-[552px] rounded-b-xl overflow-y-scroll'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className='flex justify-between p-4'>
            <div className='min-w-[200px] min-h-[24px] bg-gray-300 animate-pulse' />
            <div className='min-w-[6ch] min-h-[24px] bg-gray-300 animate-pulse' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonRepositoryContainer;
