export interface LoginState {
  username: string;
  accessToken: string | null;
  isLogin: boolean;
  setAccessToken: (token: string | null, username: string) => void;
}
