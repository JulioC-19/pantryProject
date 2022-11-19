import {createContext} from 'react';

// This is the wrapper for the screens
export type AuthContextData = {
  logIn: (email: String, password: String) => void;
  logOut: () => void;
  email: string | null | undefined;
  token: string | null | undefined;
  favoriteRecipes: string[];
};

export const AuthContext = createContext<AuthContextData>({
  logIn: (_userName: String, _password: String) => {},
  logOut: () => {},
  email: '',
  token: '',
  favoriteRecipes: [],
});
