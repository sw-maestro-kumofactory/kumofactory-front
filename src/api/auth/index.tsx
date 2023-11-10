import { authAxiosInstance, commonAxiosInstance } from '@/src/api';

interface IResponse {
  token: string;
}

export const postGithubAuth = async (code: string | null): Promise<IResponse> => {
  const { data } = await commonAxiosInstance.get(`/api/oauth/github?code=${code}`);
  return data;
};

// export const postGithubRegister = () => {};

export const postGoogleAuth = async (code: string | null): Promise<IResponse> => {
  const { data } = await commonAxiosInstance.get(`/api/oauth/google?code=${code}`);
  return data;
};

export const getRefreshToken = async (): Promise<string | null> => {
  const response = await commonAxiosInstance.get('/api/auth/refresh');
  const accessToken = response.data.accessToken;
  return accessToken;
};

export const logout = async () => {
  const response = await authAxiosInstance.get('/api/auth/logout');
  return response;
};

// export const postGoogleRegister = () => {};
//
// export const postAWSAuth = () => {};
//
// export const postAWSRegister = () => {};
