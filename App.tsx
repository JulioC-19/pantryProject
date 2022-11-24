import React, {useEffect, useMemo, useReducer} from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Signup} from './UI/Signup';
import {Login} from './UI/Login';
import {HomeScreen} from './UI/HomeScreen';
import {Search} from './UI/Search';
import {UserFavScreen} from './UI/UserFavScreen';
import {ProfileScreen} from './UI/Profile';
import {StackParamList} from './UI/navigation/screenTypes';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {colors} from './UI/styles/colors';
import {
  initAuthState,
  authStateReducer,
  AuthActionTypes,
} from './auth/authReducer';
import {AuthContext} from './auth/authContext';
import {
  SearchBarIcon,
  FavoriteBarIcon,
  HomeBarIcon,
  ProfileBarIcon,
} from './UI/components/IconComponents';
import {LoadingScreen} from './UI/components/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {toastConfig} from './UI/styles/toastConfig';
const loginAPI = 'https://newpantry.herokuapp.com/api/login';
const favoriteURL = 'https://newpantry.herokuapp.com/api/favorites';

/**
 * This navigator stack contains the app's screens.
 * If a new screen is needed, it must be added to StackParamList types.ts, so
 * that the navigator can recognize it.
 */
const Stack = createStackNavigator<StackParamList>();
const Tab = createMaterialBottomTabNavigator();

function App() {
  const [authState, dispatch] = useReducer(authStateReducer, initAuthState);
  const md5 = require('md5');

  async function handleResponseStatus(response: Response) {
    switch (response.status) {
      case 200:
        const jsonResponse = await response.json();
        const token = response.headers.get('Authorization');
        dispatch({
          type: AuthActionTypes.RETRIEVE_USER,
          payload: {
            email: jsonResponse.email,
            password: jsonResponse.password,
            authToken: token,
            isLoading: false,
          },
        });
        // Set authentication token to asyncStorage
        try {
          await AsyncStorage.setItem('@authToken', token ?? '');
          await AsyncStorage.setItem('@email', jsonResponse.email);
          await AsyncStorage.setItem('@password', jsonResponse.password);
        } catch (e) {
          // saving error
          console.log('SAVING ERROR ' + e);
        }
        Toast.show({
          type: 'success',
          text1: 'Login succesful',
          text2: 'Welcome!',
          visibilityTime: 2000,
          autoHide: true,
        });
        break;
      case 400:
        dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
        Toast.show({
          type: 'error',
          text1: 'Incorrect Input',
          text2: 'Invalid email or password, please try again',
          visibilityTime: 6000,
          autoHide: true,
        });
        break;
      case 401:
        dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
        Toast.show({
          type: 'info',
          text1: 'User not verified',
          text2: 'Please check you email and verify your account',
          visibilityTime: 8000,
          autoHide: true,
        });
        break;
    }
  }
  const getAuthToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@authToken');
      const email = await AsyncStorage.getItem('@email');
      const password = await AsyncStorage.getItem('@password');
      if (value !== null) {
        dispatch({
          type: AuthActionTypes.RETRIEVE_USER,
          payload: {
            email: email,
            password: password,
            authToken: value,
            isLoading: false,
          },
        });
      }
    } catch (e) {
      console.log('READING ERROR ' + e);
    }
  };

  const validate = (email: String) => {
    // eslint-disable-next-line no-useless-escape
    const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return expression.test(String(email).toLowerCase());
  };

  /**
   * authContext will 'memoize' the functions that will handle the API loic
   * authContext is passed to AuthContext provider so that each screen wrap
   * within in it can access the logic of each funtion.
   * */
  const authContext = useMemo(
    () => ({
      logIn: async (email: String, password: String) => {
        dispatch({type: AuthActionTypes.LOGIN, payload: {isLoading: true}});
        const validateEmail = validate(email);
        console.log(validateEmail);
        if (validateEmail) {
          try {
            console.log(email, password);
            const response = await fetch(loginAPI, {
              method: 'POST',
              body: JSON.stringify({
                email: email,
                password: md5(password),
              }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            console.log(response);
            handleResponseStatus(response);
          } catch (error) {
            dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
            // TODO: Implement an alert to the screen
            console.log(error);
          }
        } else {
          dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
          Toast.show({
            type: 'info',
            text1: 'Invalid input',
            text2: 'Please enter a valid email',
            visibilityTime: 4000,
            autoHide: true,
          });
        }
      },
      logOut: () => {},
      addToFavorites: async (
        email: string,
        favorite: string,
        token: string,
      ) => {
        const body = JSON.stringify({email: email, favorite: favorite});
        console.log(body, token);
        try {
          const response = await fetch(favoriteURL, {
            method: 'POST',
            body: body,
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
          console.log(response);
          const json = await response.json();
          console.log(json);
        } catch (error) {
          console.log(error);
        }
      },
      email: authState.email,
      password: authState.password,
      token: authState.authToken,
    }),
    [authState.authToken, authState.email, authState.password, md5],
  );

  // Used for authentication state persistance
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    getAuthToken();
  });

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {authState.isLoading === true ? (
          <LoadingScreen message={'Loading...'} />
        ) : authState.authToken === null ? (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator barStyle={localStyles.bottomTab} labeled={false}>
            <Tab.Screen
              name="Search"
              component={Search}
              options={{tabBarIcon: SearchBarIcon}}
            />
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{tabBarIcon: HomeBarIcon}}
            />
            <Tab.Screen
              name="Favorites"
              component={UserFavScreen}
              options={{tabBarIcon: FavoriteBarIcon}}
            />
            <Tab.Screen
              name="Profile"
              component={ProfileScreen}
              options={{tabBarIcon: ProfileBarIcon}}
            />
          </Tab.Navigator>
        )}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </AuthContext.Provider>
  );
}
export default App;

const localStyles = StyleSheet.create({
  bottomTab: {
    backgroundColor: colors.gleeful,
  },
});
