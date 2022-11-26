import {createContext} from 'react';

// This is the wrapper for the screens
export type AuthContextData = {
  logIn: (email: String, password: String) => void;
  logOut: () => void;
  addToFavorites: (email: string, favorite: string, token: string) => void;
  email: string | null | undefined;
  password: string | null | undefined;
  token: string | null | undefined;
};

export const AuthContext = createContext<AuthContextData>({
  logIn: (_userName: String, _password: String) => {},
  logOut: () => {},
  addToFavorites: (_email: string, _favorite: string, _token: string) => {},
  email: '',
  password: '',
  token: '',
});
