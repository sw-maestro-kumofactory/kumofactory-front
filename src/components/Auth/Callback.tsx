'use client';
import { useEffect } from 'react';
import Loading from '@/src/components/common/Loading';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';

interface CallbackProps {
  type: 'github' | 'google' | 'kakao';
  callbackURL: string;
  authRequestFunction: (code: string) => Promise<any>;
}

const ThirdPartyCallback = ({ type, callbackURL, authRequestFunction }: CallbackProps) => {
  const { setAccessToken, setId } = useAuthStore((state) => state.UserAction);
  const router = useRouter();
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')!;
    const fetchData = () => {
      authRequestFunction(code)
        .then((res) => {
          setId();
          setAccessToken(res.accessToken);
          router.push('/');
        })
        .catch((e) => {
          console.error(e);
        });
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
