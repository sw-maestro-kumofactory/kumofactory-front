import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { postGoogleAuth } from '@/src/api/auth';
import Loading from '@/src/components/common/Loading';
import { accessTokenState } from '@/src/atoms/auth';

const GoogleLoginCallback = () => {
  const navigate = useNavigate();
  const setAccessTokenState = useSetRecoilState(accessTokenState);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const fetchData = () => {
      postGoogleAuth(code)
        .then((res) => {
          // cookie 추가하는 로직
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

export default GoogleLoginCallback;
