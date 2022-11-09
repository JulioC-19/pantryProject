import React, {useEffect, useMemo, useReducer} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Signup} from './UI/Signup';
import {Login} from './UI/Login';
import {HomeScreen} from './UI/HomeScreen';
import {Search} from './UI/Search';
import {ProfileScreen} from './UI/Profile';
import {StackParamList, NavigationProps} from './UI/navigation/screenTypes';
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
import {LoadingModal} from './UI/components/LoadingModal';
const loginAPI = 'https://newpantry.herokuapp.com/api/login';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FavoriteScreen = ({navigation}: NavigationProps) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Favorite Screen</Text>
    </View>
  );
};

/**
 * This navigator stack contains the app's screens.
 * If a new screen is needed, it must be added to StackParamList types.ts, so
 * that the navigator can recognize it.
 */
const Stack = createStackNavigator<StackParamList>();
const Tab = createMaterialBottomTabNavigator();

function App() {
  const [authState, dispatch] = useReducer(authStateReducer, initAuthState);

  /**
   * authContext will 'memoize' the functions that will handle the API loic
   * authContext is passed to AuthContext provider so that each screen wrap
   * within in it can access the logic of each funtion.
   * TODO: Implement a loading spinner
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
              password: password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const jsonResponse = await response.json();
          if (response.status === 200) {
            const authToken = response.headers.get('authorization');
            dispatch({
              type: AuthActionTypes.RETRIEVE_USER,
              payload: {
                email: jsonResponse.email,
                password: jsonResponse.password,
                authToken: authToken,
                isLoading: false,
              },
            });
          }
        } catch (error) {
          dispatch({type: AuthActionTypes.FAIL});
          // TODO: Implement an alert to the screen
          console.log(error);
        }
      },
      logOut: () => {},
    }),
    [],
  );

  // Used for authentication state persistance
  useEffect(() => {
    if (authState.authToken) {
      return;
    }
  });

  console.log(authState.isLoading, authState.authToken);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {authState.isLoading ? (
          <LoadingModal
            isVisible={authState.isLoading}
            message={'Loading...'}
          />
        ) : authState.authToken == null ? (
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
              component={FavoriteScreen}
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
