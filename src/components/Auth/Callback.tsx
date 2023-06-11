'use client';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { accessTokenState } from '@/src/atoms/auth';
import Loading from '@/src/components/common/Loading';
import { useRouter } from 'next/navigation';

interface CallbackProps {
  type: 'github' | 'google' | 'kakao';
  callbackURL: string;
  authRequestFunction: (code: string) => Promise<any>;
}

const ThirdPartyCallback = ({ type, callbackURL, authRequestFunction }: CallbackProps) => {
  const router = useRouter();
  const setAccessTokenState = useSetRecoilState(accessTokenState);
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')!;
    const fetchData = () => {
      authRequestFunction(code)
        .then((res) => {
          const token = res.token;
          setAccessTokenState(token);
          console.log(1);
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
