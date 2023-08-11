'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Loading from '@/src/components/common/Loading';
import { useLogin } from '@/src/hooks/Auth/useLogin';

interface CallbackProps {
  type: 'github' | 'google' | 'kakao';
  callbackURL: string;
  authRequestFunction: (code: string) => Promise<any>;
}

const ThirdPartyCallback = ({ type, callbackURL, authRequestFunction }: CallbackProps) => {
  const { Login } = useLogin();
  const router = useRouter();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')!;
    const fetchData = async () => {
      try {
        const res = await authRequestFunction(code);
        const newToken = res.accessToken;
        const username = res.profileName;
        Login(newToken, username);
        router.push('/');
      } catch (e) {
        console.error('component/auth/Callback.tsx', e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='w-full h-full'>
      <Loading />
    </div>
  );
};

export default ThirdPartyCallback;
