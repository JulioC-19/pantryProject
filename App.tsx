import React, {useEffect, useMemo, useReducer, useState} from 'react';
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
const loginAPI = 'https://newpantry.herokuapp.com/api/login';

/**
 * This navigator stack contains the app's screens.
 * If a new screen is needed, it must be added to StackParamList types.ts, so
 * that the navigator can recognize it.
 */
const Stack = createStackNavigator<StackParamList>();
const Tab = createMaterialBottomTabNavigator();

function App() {
  const [authState, dispatch] = useReducer(authStateReducer, initAuthState);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const md5 = require('md5');
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

  /**
   * authContext will 'memoize' the functions that will handle the API loic
   * authContext is passed to AuthContext provider so that each screen wrap
   * within in it can access the logic of each funtion.
   *
   *
   * */
  const authContext = useMemo(
    () => ({
      logIn: async (email: String, password: String) => {
        dispatch({type: AuthActionTypes.LOGIN, payload: {isLoading: true}});
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
          const jsonResponse = await response.json();
          setFavoriteRecipes(jsonResponse.favoriteRecipes);
          console.log(jsonResponse.confirmToken);
          if (response.status === 200) {
            dispatch({
              type: AuthActionTypes.RETRIEVE_USER,
              payload: {
                email: jsonResponse.email,
                password: jsonResponse.password,
                authToken: jsonResponse.confirmToken,
                isLoading: false,
              },
            });
            // Set authentication token to asyncStorage
            try {
              await AsyncStorage.setItem(
                '@authToken',
                jsonResponse.confirmToken,
              );
              await AsyncStorage.setItem('@email', jsonResponse.email);
              await AsyncStorage.setItem('@password', jsonResponse.password);
            } catch (e) {
              // saving error
              console.log('SAVING ERROR ' + e);
            }
          }
        } catch (error) {
          dispatch({type: AuthActionTypes.FAIL});
          // TODO: Implement an alert to the screen
          console.log(error);
        }
      },
      logOut: () => {},
      email: authState.email,
      token: authState.authToken,
      favoriteRecipes: favoriteRecipes,
    }),
    [authState.authToken, authState.email, favoriteRecipes, md5],
  );

  // Used for authentication state persistance
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    getAuthToken();
  });

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {authState.isLoading ? (
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
              initialParams={{email: authState.email}}
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
    </AuthContext.Provider>
  );
}
export default App;

const localStyles = StyleSheet.create({
  bottomTab: {
    backgroundColor: colors.gleeful,
  },
});
