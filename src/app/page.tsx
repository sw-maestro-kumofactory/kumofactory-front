import Link from 'next/link';

import Landing from '@/src/components/landing';

const content = [
  {
    title: '1234',
    description: '1234',
    image: '1234',
  },
  {
    title: '1235',
    description: '1235',
    image: '1235',
  },
  {
    title: '1245',
    description: '1245',
    image: '1245',
  },
  {
    title: '1345',
    description: '1345',
    image: '1345',
  },
];

const Home = () => {
  return (
    <div className='w-full h-fulll'>
      {/*<div className='w-full h-full flex flex-col flex-wrap items-center justify-center'>*/}
      {/*  <div className='md:text-8xl sm:text-6xl mb-16 text-center '>*/}
      {/*    Hi, We are*/}
      {/*    <span className='font-bold text-[#799ACF]'>*/}
      {/*      <div>Kumo Factory</div>*/}
      {/*    </span>*/}
      {/*  </div>*/}
      {/*  <Link className='text-4xl font-bold text-gray-500 hover:text-gray-400 transition' href='/blueprint'>*/}
      {/*    Build Your Own Architecture!*/}
      {/*  </Link>*/}
      {/*</div>*/}
      {content.map((item, index) => {
        return <Landing key={index} title={item.title} description={item.description} src={item.image} index={index} />;
      })}
    </div>
  );
};

export default Home;
