const BluePrint = () => {
  return (
    <div className='w-full h-full p-16'>
      <div className='flex w-full h-[45%] justify-between  mb-12'>
        <div className='flex items-center justify-center w-[48%] h-full bg-gray-200'>New BluePrint</div>
        <div className='flex items-center justify-center w-[48%] h-full bg-gray-200'>Load Template</div>
      </div>
      <div className='h-[50%] bg-yellow-200 overflow-y-scroll'>show list of my blueprints</div>
    </div>
  );
};

export default BluePrint;
