const useGoogleAuth = () => {
  const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const redirect_uri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  return {
    login() {
      open(
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=openid&response_type=code`,
        '_parent',
      );
    },
  };
};

export default useGoogleAuth;
