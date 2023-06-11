'use client';
import { postGithubAuth } from '@/src/api/auth';
import ThirdPartyCallback from '@/src/components/Auth/Callback';

const GithubLoginCallback = () => {
  return ThirdPartyCallback({
    type: 'github',
    callbackURL: process.env.NEXT_PUBLIC_GITHUB_LOGIN_URL!,
    authRequestFunction: postGithubAuth,
  });
};

export default GithubLoginCallback;
