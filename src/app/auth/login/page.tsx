'use client';
import { useStore } from 'zustand';

import useGoogleAuth from '@/src/hooks/Auth/useGoogleAuth';
import useGithubAuth from '@/src/hooks/Auth/useGithubAuth';
import KakaoAuthButton from '@/src/components/Auth/Button/kakaoAuthButton';
import GithubAuthButton from '@/src/components/Auth/Button/githubAuthButton';
import GoogleAuthButton from '@/src/components/Auth/Button/googleAuthButton';
import useAuthStore from '@/src/hooks/Store/auth/useAuthStore';

const Login = () => {
  const isLogin = useStore(useAuthStore, (state) => state.isLogin);
  const googleAuth = useGoogleAuth();
  const githubAuth = useGithubAuth();

  return (
    <div className='flex flex-col h-full items-center justify-center gap-20'>
      {isLogin ? (
        <>already logged in</>
      ) : (
        <>
          <div className='font-bold text-6xl text-[#195091]'>Login with</div>
          <div className='flex gap-16'>
            <KakaoAuthButton onClick={() => {}} />
            <GithubAuthButton
              onClick={() => {
                githubAuth.login();
              }}
            />
            <GoogleAuthButton
              onClick={() => {
                googleAuth.login();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
