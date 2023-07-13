export interface UserState {
  id: string;
  accessToken: string | null;
  UserAction: {
    setAccessToken: (token: string | null) => void;
    setId: () => void;
  };
}
