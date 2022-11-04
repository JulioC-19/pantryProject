export enum AuthActionTypes {
  LOGIN,
  SIGNOUT,
  FAIL,
  RETRIEVE_USER,
}

export type AuthState = {
  email: string;
  password: string;
  userToken?: string | null;
  isLoading: boolean;
};

export const initAuthState: AuthState = {
  email: '',
  password: '',
  userToken: null,
  isLoading: false,
};

type AuthAction = {type: AuthActionTypes};

export function authStateReducer(
  state: AuthState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    // First time the user logins
    case AuthActionTypes.LOGIN:
      return {
        email: '',
        password: '',
        userToken: null,
        isLoading: true,
      };
    // If user is authenticated, retrieve its information
    case AuthActionTypes.RETRIEVE_USER:
      return {
        email: state.email,
        password: state.password,
        userToken: state.userToken,
        isLoading: false,
      };
    // Clear the user token, email and password
    case AuthActionTypes.FAIL:
    case AuthActionTypes.SIGNOUT:
      return {
        email: '',
        password: '',
        userToken: null,
        isLoading: false,
      };
  }
}
