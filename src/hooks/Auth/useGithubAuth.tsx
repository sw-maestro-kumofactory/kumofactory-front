const useGithubAuth = () => {
  return {
    login() {
      open(
        `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email,repo`,
        '_parent',
      );
    },
  };
};

export default useGithubAuth;
