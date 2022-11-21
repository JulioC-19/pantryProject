import React, {useEffect, useState, useContext} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {CardItem, ListHeader} from './components/CardItem';
import {colors} from './styles/colors';
import {AuthContext} from '../auth/authContext';

export const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [latestMeals, setLatestMeals] = useState([]);
  const {email, token, addToFavorites} = useContext(AuthContext);

  const getRandomMeals = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v2/9973533/randomselection.php',
      );
      const jsonMeals = await response.json();
      setMeals(jsonMeals.meals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getLastestMeals = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v2/9973533/latest.php',
      );
      const jsonMeals = await response.json();
      setLatestMeals(jsonMeals.meals.slice(0, 5));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomMeals();
    getLastestMeals();
  }, []);

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
        onPressFavorite={() =>
          addToFavorites(email ?? '', item.strMeal, token ?? '')
        }
      />
    );
  };

  return (
    <View style={localStyles.screenContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <View>
            <ListHeader
              title={'SEASONAL RECOMENDATIONS'}
              color={colors.goldenRod}
            />
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={meals}
              horizontal={true}
              keyExtractor={(item: any, _index) => {
                return item.idMeal;
              }}
              renderItem={({item}: any) => cardItem(item)}
            />
          </View>
          <View style={localStyles.listContainer}>
            <ListHeader title={'TRENDING'} color={colors.mountainIris} />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={latestMeals.slice(0, 10)}
              numColumns={2}
              horizontal={false}
              keyExtractor={(item: any, _index) => {
                return item.idMeal;
              }}
              renderItem={({item}: any) => cardItem(item)}
            />
          </View>
        </>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  screenContainer: {flex: 1, padding: 10},
  listContainer: {
    paddingBottom: 250,
  },
});
