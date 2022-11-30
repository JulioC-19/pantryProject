import {createContext} from 'react';

// This is the wrapper for the screens
export type AuthContextData = {
  logIn: (email: string, password: string) => void;
  logOut: () => void;
  addToFavorites: (email: string, favorite: string, token: string) => void;
  email: string | null | undefined;
  password: string | null | undefined;
  token: string | null | undefined;
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  profilePicture: string | null | undefined;
};

export const AuthContext = createContext<AuthContextData>({
  logIn: (_userName: string, _password: string) => {},
  logOut: () => {},
  email: '',
  password: '',
  token: '',
  addToFavorites: (_email: string, _favorite: string, _token: string) => {},
  firstName: '',
  lastName: '',
  profilePicture: '',
});
