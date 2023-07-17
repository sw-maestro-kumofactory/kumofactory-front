export interface UserState {
  id: string;
  accessToken: string | null;
  isLogin: boolean;
  UserAction: {
    logout: () => void;
    setAccessToken: (token: string | null) => void;
    setId: () => void;
  };
}
