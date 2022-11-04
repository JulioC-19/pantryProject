import {createContext} from 'react';

// This is the wrapper for the screens
export type AuthContextData = {
  logIn: (userName: String, password: String) => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextData>({
  logIn: (_userName: String, _password: String) => {},
  logOut: () => {},
});
