import axios, { AxiosResponse } from 'axios';

interface IResponse {
  token: string;
}

export const postGithubAuth = async (code: string | null): Promise<IResponse> => {
  const { data } = await axios
    .post(`/oauth/github?code=${code}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    .then((res) => {
      return res;
    });

  return data;
};

// export const postGithubRegister = () => {};

export const postGoogleAuth = async (code: string | null): Promise<IResponse> => {
  const { data } = await axios.post('/google/access_token', { code: code }).then((res) => {
    return res;
  });
  return data;
};

// export const postGoogleRegister = () => {};
//
// export const postAWSAuth = () => {};
//
// export const postAWSRegister = () => {};
