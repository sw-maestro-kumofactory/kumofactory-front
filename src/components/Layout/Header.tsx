'use strict';
import Link from 'next/link';
export const Header = () => {
  return (
    <div className='fixed flex justify-between w-full text-2xl text-white bg-[#195091] h-20 p-4 select-none'>
      <Link className='px-4 py-2 rounded-2xl' href='/'>
        Kumo Factory
      </Link>
      <Link className='bg-[#799ACF] px-4 py-2 rounded-2xl' href='/auth/login'>
        SignIn
      </Link>
    </div>
  );
};
