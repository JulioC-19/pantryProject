import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Signup} from './UI/Signup';
import {Login} from './UI/Login';
import {SearchScreen} from './UI/Search';
import {StackParamList, NavigationProps} from './UI/navigation/screenTypes';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {colors} from './UI/styles/colors';
import Icon from './UI/styles/icons';

const HomeScreen = ({navigation}: NavigationProps) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
};

const SearchScreen = ({navigation}: NavigationProps) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Search Screen</Text>
    </View>
  );
};

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
  // Temporary set to true to access the user portal
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Tab.Navigator barStyle={localStyles.bottomTab} labeled={false}>
          <Tab.Screen
            name="Search"
            component={SearchScreen}
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
  );
}
export default App;

const localStyles = StyleSheet.create({
  bottomTab: {
    backgroundColor: colors.gleeful,
  },
});