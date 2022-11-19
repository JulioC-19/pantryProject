import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {AuthContext} from '../auth/authContext';
import {useContext, useEffect, useState} from 'react';
import {CardItem} from './components/CardItem';

const URL = 'https://newpantry.herokuapp.com/api/favorites';
export const FavScreen = () => {
  const [meals, setFavMeals] = useState([]);
  const {email, token} = useContext(AuthContext);

  useEffect(() => {
    let favMeals: any = [];
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
        for (let i = 0; i < json.length; i++) {
          if (json[i] == null) {
            continue;
          }
          try {
            const response2 = await fetch(
              `https://www.themealdb.com/api/json/v1/1/search.php?s=${json[i]}`,
            );
            const jsonMeals = await response2.json();
            favMeals.push(jsonMeals.meals[0]);
          } catch (error) {
            console.log(error);
          }
        }
        setFavMeals(favMeals);
      } catch (error) {
        console.log('ERROR: ' + error);
      }
    };
    getFavMeals();
  }, [email, token]);

  console.log(meals);
  const cardItem = (item: {
    strMealThumb: string;
    strMeal: string;
    strInstructions: string | undefined;
  }) => {
    return (
      <CardItem
        uri={item.strMealThumb}
        title={item.strMeal}
        instructions={item.strInstructions}
      />
    );
  };

  // TODO: Implement a onRefresh to update favorite recipies
  return (
    <View style={localStyles.listContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={meals}
        numColumns={2}
        horizontal={false}
        keyExtractor={(item: any, _index) => {
          return item.idMeal;
        }}
        renderItem={({item}: any) => cardItem(item)}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  listContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
});
