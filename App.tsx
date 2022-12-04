import React, {useCallback, useEffect, useMemo, useReducer} from 'react';
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

import {LoadingScreen} from './UI/components/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {toastConfig} from './UI/styles/toastConfig';
import Icon from './UI/styles/icons';
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

  const handleLoginResponse = useCallback(
    async (response: Response) => {
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
              firstName: authState.firstName,
              lastName: authState.lastName,
              profilePicture: authState.profilePicture,
            },
          });
          // Set authentication token to asyncStorage
          try {
            await AsyncStorage.setItem('@authToken', token ?? '');
            await AsyncStorage.setItem('@email', jsonResponse.email);
            await AsyncStorage.setItem('@password', jsonResponse.password);
            await AsyncStorage.setItem('@firstName', jsonResponse.firstName);
            await AsyncStorage.setItem('@lastName', jsonResponse.lastName);
            await AsyncStorage.setItem(
              '@profilePicture',
              jsonResponse.profilePicture,
            );
          } catch (e) {
            // saving error
            console.log('SAVING ERROR ' + e);
          }
          break;
        case 400:
          dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
          Toast.show({
            type: 'error',
            text1: 'Invalid email or password, please try again',
            visibilityTime: 6000,
            autoHide: true,
          });
          break;
        case 401:
          dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
          Toast.show({
            type: 'info',
            text1: 'Invalid password or user email not verified',
            visibilityTime: 6000,
            autoHide: true,
          });
          break;
        case 404:
          dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
          Toast.show({
            type: 'error',
            text1: 'Invalid email',
            visibilityTime: 6000,
            autoHide: true,
          });
          break;
        case 500:
          dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
          Toast.show({
            type: 'info',
            text1: 'Unexpected server error',
            visibilityTime: 6000,
            autoHide: true,
          });
          break;
        case 503:
          dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
          Toast.show({
            type: 'info',
            text1: 'Failed to connect to server',
            visibilityTime: 6000,
            autoHide: true,
          });
          break;
        default:
          dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
          Toast.show({
            type: 'info',
            text1: 'Unexpected server error',
            visibilityTime: 6000,
            autoHide: true,
          });
      }
    },
    [authState.firstName, authState.lastName, authState.profilePicture],
  );

  const getAuthToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@authToken');
      const email = await AsyncStorage.getItem('@email');
      const password = await AsyncStorage.getItem('@password');
      const firstName = await AsyncStorage.getItem('@firstName');
      const lastName = await AsyncStorage.getItem('@lastName');
      const profilePicture = await AsyncStorage.getItem('@profilePicture');
      if (value !== null) {
        dispatch({
          type: AuthActionTypes.RETRIEVE_USER,
          payload: {
            email: email,
            password: password,
            authToken: value,
            isLoading: false,
            firstName: firstName,
            lastName: lastName,
            profilePicture: profilePicture,
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
      logIn: async (email: string, password: string) => {
        // log in
        dispatch({type: AuthActionTypes.LOGIN, payload: {isLoading: true}});
        const validateEmail = validate(email);
        if (validateEmail) {
          try {
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
            handleLoginResponse(response);
          } catch (error) {
            dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
            // TODO: Implement an alert to the screen
            console.log(error);
          }
        } else {
          dispatch({type: AuthActionTypes.FAIL, payload: {isLoading: false}});
          Toast.show({
            type: 'info',
            text1: 'Please enter a valid email',
            visibilityTime: 4000,
            autoHide: true,
          });
        }
      },
      logOut: async () => {
        try {
          await AsyncStorage.removeItem('@email');
          await AsyncStorage.removeItem('@password');
          await AsyncStorage.removeItem('@authToken');
          await AsyncStorage.removeItem('@firstName');
          await AsyncStorage.removeItem('@lastName');
          await AsyncStorage.removeItem('@profilePicture');
        } catch {
          console.log('LOGOUT ERROR');
        }
        dispatch({
          type: AuthActionTypes.SIGNOUT,
          payload: {},
        });
      },
      addToFavorites: async (
        email: string,
        favorite: string,
        token: string,
      ) => {
        const body = JSON.stringify({email: email, favorite: favorite});
        try {
          const response = await fetch(favoriteURL, {
            method: 'POST',
            body: body,
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
          const json = await response.json();
        } catch (error) {
          console.log(error);
        }
      },
      email: authState.email,
      password: authState.password,
      token: authState.authToken,
      firstName: authState.firstName,
      lastName: authState.lastName,
      profilePicture: authState.profilePicture,
    }),
    [
      authState.authToken,
      authState.email,
      authState.firstName,
      authState.lastName,
      authState.password,
      authState.profilePicture,
      handleLoginResponse,
      md5,
    ],
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
          <Tab.Navigator
            barStyle={localStyles.bottomTab}
            labeled={false}
            screenOptions={({route}) => ({
              tabBarIcon: ({focused}) => {
                if (route.name === 'Home') {
                  return (
                    <Icon.MaterialCommunityIcons
                      name="home"
                      color={focused ? colors.fullYellow : colors.white}
                      size={28}
                    />
                  );
                } else if (route.name === 'Favorites') {
                  return (
                    <Icon.MaterialIcons
                      name="favorite"
                      color={focused ? colors.fullYellow : colors.white}
                      size={26}
                    />
                  );
                } else if (route.name === 'Search') {
                  return (
                    <Icon.Ionicons
                      name="md-search"
                      color={focused ? colors.fullYellow : colors.white}
                      size={26}
                    />
                  );
                } else if (route.name === 'Profile') {
                  return (
                    <Icon.FontAwesome
                      name="user"
                      color={focused ? colors.fullYellow : colors.white}
                      size={28}
                    />
                  );
                }
              },
              tabBarActiveTintColor: colors.fullYellow,
              tabBarInactiveTintColor: colors.white,
            })}>
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Favorites" component={UserFavScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
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
