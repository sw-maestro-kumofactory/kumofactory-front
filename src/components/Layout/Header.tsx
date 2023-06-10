'use strict';
import Link from 'next/link';
export const Header = () => {
  return (
    <div className='fixed flex justify-between w-full text-4xl text-white bg-[#195091] p-4'>
      <Link className='bg-[#799ACF] px-4 py-2 rounded-2xl' href='/'>
        Logo
      </Link>
      <Link className='bg-[#799ACF] px-4 py-2 rounded-2xl' href='/login'>
        SignIn
      </Link>
    </div>
  );
};
