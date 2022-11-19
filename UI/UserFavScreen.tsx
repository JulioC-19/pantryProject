import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from './styles/colors';
import {PantryScreen} from '../UI/PantryScreen';
import {FavScreen} from './FavScreen';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      style={localStyles.tabNavigatorStyle}
      initialRouteName="Favorites"
      initialLayout={{
        width: Dimensions.get('window').width,
      }}
      screenOptions={{
        tabBarLabelStyle: localStyles.tabBarLabelStyle,
        tabBarStyle: localStyles.tabBarStyle,
        tabBarIndicatorStyle: localStyles.tabBarIndicatorStyle,
      }}>
      <Tab.Screen
        name="Favorites"
        component={FavScreen}
        options={{tabBarLabel: 'Favorites'}}
      />
      <Tab.Screen
        name="Pantry"
        component={PantryScreen}
        options={{tabBarLabel: 'Pantry'}}
      />
    </Tab.Navigator>
  );
}

export const UserFavScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <MyTabs />
    </NavigationContainer>
  );
};

const localStyles = StyleSheet.create({
  tabNavigatorStyle: {paddingTop: 10},
  tabBarLabelStyle: {
    fontSize: 16,
    color: colors.white,
    fontStyle: 'normal',
    fontFamily: 'Barlow',
  },
  tabBarStyle: {
    backgroundColor: colors.darkOliveGreen,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 30,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.gleeful,
    height: '100%',
    borderRadius: 30,
  },
});
