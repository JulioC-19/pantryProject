import React from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../auth/authContext';
import {useContext, useEffect, useState} from 'react';

const URL = 'https://newpantry.herokuapp.com/api/favorites';
export const FavScreen = () => {
  const [meals, setFavMeals] = useState([]);
  const {email, token} = useContext(AuthContext);

  const body = JSON.stringify({email: email});
  const getFavMeals = async () => {
    try {
      const response = await fetch(URL, {
        credentials: 'include',
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ?? '',
        },
      });
      const json = await response.json();
      console.log('FAVORITE MEALS? ' + json);
    } catch (error) {
      console.log('ERROR: ' + error);
    }
  };

  useEffect(() => {
    getFavMeals();
  });
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Favorites!</Text>
    </View>
  );
};
