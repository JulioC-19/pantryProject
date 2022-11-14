import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from './styles/colors';

function FavScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Favorites!</Text>
    </View>
  );
}

function PantryScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Pantry!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Favorites"
      initialLayout={{
        width: Dimensions.get('window').width,
      }}
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12, color: colors.white},
        tabBarStyle: {
          backgroundColor: colors.darkOliveGreen,
          width: '80%',
          alignSelf: 'center',
          borderRadius: 20,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.gleeful,
          height: '100%',
          borderRadius: 20,
        },
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
