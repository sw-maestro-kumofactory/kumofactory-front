'use client';
import { postGoogleAuth } from '@/src/api/auth';
import ThirdPartyCallback from '@/src/components/Auth/Callback';

const GoogleLoginCallback = () => {
  return ThirdPartyCallback({
    type: 'google',
    callbackURL: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!,
    authRequestFunction: postGoogleAuth,
  });
};

export default GoogleLoginCallback;
