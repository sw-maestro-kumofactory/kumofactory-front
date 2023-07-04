import axios, { AxiosResponse } from 'axios';

interface IResponse {
  token: string;
}

export const postGithubAuth = async (code: string | null): Promise<IResponse> => {
  const { data } = await axios
    .get(`/api/oauth/github?code=${code}`, {
      headers: {
        Accept: 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    })
    .then((res) => {
      return res;
    });

  return data;
};

// export const postGithubRegister = () => {};

export const postGoogleAuth = async (code: string | null): Promise<IResponse> => {
  const { data } = await axios
    .get(`/api/oauth/google?code=${code}`, {
      headers: {
        Accept: 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    })
    .then((res) => {
      return res;
    });
  return data;
};

// export const postGoogleRegister = () => {};
//
// export const postAWSAuth = () => {};
//
// export const postAWSRegister = () => {};
