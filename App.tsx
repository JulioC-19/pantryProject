import React, {useMemo, useReducer, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Signup} from './UI/Signup';
import {Login} from './UI/Login';
import {HomeScreen} from './UI/HomeScreen';
import {Search} from './UI/Search';
import {StackParamList, NavigationProps} from './UI/navigation/screenTypes';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {colors} from './UI/styles/colors';
import Icon from './UI/styles/icons';
import {
  initAuthState,
  authStateReducer,
  AuthActionTypes,
} from './auth/authReducer';
import {AuthContext} from './auth/authContext';
const loginAPI = 'https://newpantry.herokuapp.com/api/login';

const FavoriteScreen = ({navigation}: NavigationProps) => {
  return (
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

const SearchBarIcon = () => {
  return <Icon.Ionicons name="md-search" color={colors.white} size={26} />;
};

const FavoriteBarIcon = () => {
  return <Icon.MaterialIcons name="favorite" color={colors.white} size={26} />;
};

const HomeBarIcon = () => {
  return (
    <Icon.MaterialCommunityIcons name="home" color={colors.white} size={28} />
  );
};

function App() {
  const [authState, dispatch] = useReducer(authStateReducer, initAuthState);

  // This could be exported somehow, but need to figure out a way to hook up the useReducer()
  const authContext = useMemo(
    () => ({
      logIn: async (email: String, password: String) => {
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
          console.log(jsonResponse);
          if (response.status === 200) {
            // If the response is good, need to dispatch the reducer to update the states
            // Need to dispatch a payload with the corresponding values
            // Need this authorization to be used as a token
            console.log(response.headers.get('authorization'));
          }
        } catch (error) {
          console.log(error);
        }
      },
      logOut: () => {},
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {authState.userToken ? (
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
          </Tab.Navigator>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </Stack.Navigator>
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
