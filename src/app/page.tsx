import Link from 'next/link';

import Landing from '@/src/components/landing';

const content = [
  {
    title: 'Create your cloud in a snap',
    description:
      'Create your cloud architecture without console and Deploy the cloud architecture with a single button ',
    image: '/icons/Landing/landing1.png',
  },
  {
    title: 'Deploy your application on instance what you want',
    description:
      'Try deploying your application to an instance with just a few clicks. All you need to do is choose the project and the instance. You don’t need docker file, connecting to instance',
    image: '/icons/Landing/landing2.png',
  },
  {
    title: 'Use Template for your cloud',
    description:
      'If you don’t have knowledge about cloud well,You can use Template for your cloud. Kumo Factory and Users create and share templates for different situations (number of users, traffic, type of service).',
    image: '/icons/Landing/landing3.png',
  },
//  {
//    title: 'Find your Hidden cost ',
  //  description: 'Find your hidden cost in your architecture. You can predict how much it will cost in the cloud.',
  //  image: '/icons/Landing/landing4.png',
 // },
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
