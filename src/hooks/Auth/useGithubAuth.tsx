const useGithubAuth = () => {
  return {
    login() {
      open(
        `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user:email`,
        '_parent',
      );
    },
  };
};

export default useGithubAuth;
