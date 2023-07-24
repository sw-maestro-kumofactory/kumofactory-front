export interface LoginState {
  accessToken: string | null;
  isLogin: boolean;
  setAccessToken: (token: string | null) => void;
}
