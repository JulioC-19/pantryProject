import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {CardItem, ListHeader} from './components/CardItem';
import {colors} from './styles/colors';

export const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [latestMeals, setLatestMeals] = useState([]);

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

  //console.log(JSON.stringify(meals[0]));

  return (
    <View style={{flex: 1, padding: 10}}>
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
              keyExtractor={(item: any, index) => {
                return item.idMeal;
              }}
              renderItem={({item}: any) => (
                <CardItem
                  uri={item.strMealThumb}
                  title={item.strMeal}
                  instructions={item.strInstructions}
                />
              )}
            />
          </View>
          <View style={{paddingBottom: 250}}>
            <ListHeader title={'TRENDING'} color={colors.mountainIris} />
            <FlatList
              showsVerticalScrollIndicator={false}
              data={latestMeals.slice(0, 10)}
              numColumns={2}
              horizontal={false}
              keyExtractor={(item: any, index) => {
                return item.idMeal;
              }}
              renderItem={({item}: any) => (
                <CardItem
                  uri={item.strMealThumb}
                  title={item.strMeal}
                  instructions={item.strInstructions}
                />
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};
