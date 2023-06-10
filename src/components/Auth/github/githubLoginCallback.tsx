import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { accessTokenState } from '@/src/atoms/auth';
import { postGithubAuth } from '@/src/api/auth';
import Loading from '@/src/components/common/Loading';

const GithubLoginCallback = () => {
  const navigate = useNavigate();
  const setAccessTokenState = useSetRecoilState(accessTokenState);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const fetchData = () => {
      postGithubAuth(code)
        .then((res) => {
          const token = res.token;
          setAccessTokenState(token);
          console.log(token);
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

export default GithubLoginCallback;
