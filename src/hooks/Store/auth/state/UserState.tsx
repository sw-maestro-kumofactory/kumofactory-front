export interface UserState {
  id: string;
  accessToken: string;
  UserAction: {
    setAccessToken: (token: string) => void;
  };
}
