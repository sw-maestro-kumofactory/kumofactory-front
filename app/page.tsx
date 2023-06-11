'use client';
import { useLogin } from '@/src/hooks/useLogin';
import Link from 'next/link';

const Home = () => {
  const { isLogin, login, logout } = useLogin();
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='text-8xl mb-16'>
        Hi, We are <span className='font-bold text-[#799ACF]'>Kumo Factory</span>
      </div>
      {isLogin ? (
        <div className='text-4xl hover:text-gray-500' onClick={() => logout()}>
          로그아웃하기
        </div>
      ) : (
        <Link className='text-4xl font-bold text-gray-500 hover:text-gray-400 transition' href='/auth/login'>
          Build Your Own Architecture!
        </Link>
      )}
    </div>
  );
};

export default Home;
