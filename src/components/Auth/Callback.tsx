import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { accessTokenState } from '@/src/atoms/auth';
import Loading from '@/src/components/common/Loading';

interface CallbackProps {
  type: 'github' | 'google' | 'kakao';
  callbackURL: string;
  authRequestFunction: (code: string) => Promise<any>;
}

const ThirdPartyCallback = ({ type, callbackURL, authRequestFunction }: CallbackProps) => {
  const navigate = useNavigate();
  const setAccessTokenState = useSetRecoilState(accessTokenState);
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code')!;
    const fetchData = () => {
      authRequestFunction(code)
        .then((res) => {
          const token = res.token;
          setAccessTokenState(token);
          navigate('/');
        })
        .catch((e) => {
          console.error(e);
        });
    };
    fetchData();
  }, []);
  return (
    <>
      <Loading />
    </>
  );
};

export default ThirdPartyCallback;
