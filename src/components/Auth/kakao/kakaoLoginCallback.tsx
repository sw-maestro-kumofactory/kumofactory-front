import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PacmanLoader } from 'react-spinners';
import { useSetRecoilState } from 'recoil';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const setAccessTokenState = useSetRecoilState(accessTokenState);

  const code = new URL(window.location.href).searchParams.get('code');
  useEffect(() => {
    axios
      .get(`/auth/kakao?code=${code}`)
      .then((res) => {
        setAccessTokenState(res.data.token);
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
      });
  }, [code]);

  return (
    <>
      <Loading />
    </>
  );
};

export default KakaoCallback;
