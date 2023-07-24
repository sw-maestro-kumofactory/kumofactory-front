import Link from 'next/link';

const Home = () => {
  return (
    <div className='w-full h-full flex flex-col flex-wrap items-center justify-center'>
      <div className='md:text-8xl sm:text-6xl mb-16 text-center '>
        Hi, We are
        <span className='font-bold text-[#799ACF]'>
          <div>Kumo Factory</div>
        </span>
      </div>
      <Link className='text-4xl font-bold text-gray-500 hover:text-gray-400 transition' href='/blueprint'>
        Build Your Own Architecture!
      </Link>
    </div>
  );
};

export default Home;
