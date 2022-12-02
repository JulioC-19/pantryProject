import React, {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {AuthContext} from '../auth/authContext';
import {useContext, useEffect, useState} from 'react';
import {CardItem} from './components/CardItem';
import {LoadingScreen} from './components/LoadingScreen';
import {getIngredientList, mealWithIngredients} from './HomeScreen';
import {colors} from './styles/colors';

const URL = 'https://newpantry.herokuapp.com/api/favorites';

export const FavScreen = () => {
  const [meals, setFavMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {email, token, addToFavorites} = useContext(AuthContext);
  const [mealsIngredients, setMealsIngredients] = useState<mealWithIngredients>(
    {},
  );

  /**
   * This effects triggers the first time user navigates to the screen
   * useEffect gets called once because ideally, the email and token should not
   * update while a user is login, that would not make sense.
   */
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
        let ingredientList = getIngredientList(favMeals);
        setMealsIngredients(ingredientList);
      } catch (error) {
        console.log('ERROR: ' + error);
      } finally {
        setLoading(false);
      }
    };
    getFavMeals();
  }, [email, token]);

  /**
   * This methods gets called on the onRefresh event
   * It updates the list of favorites if the user recentley
   * added a new recipe but does not run automatically.
   * User must initiate the onRefresh by pulling down on the screen
   */
  const onRefresh = useCallback(() => {
    setRefreshing(true);
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
      } finally {
        setRefreshing(false);
      }
    };
    getFavMeals();
  }, [email, token]);

  const cardItem = (item: {
    idMeal: any;
    strMealThumb: string;
    strMeal: string;
    strInstructions: string | undefined;
  }) => {
    return (
      <CardItem
        uri={item.strMealThumb}
        title={item.strMeal}
        ingredientList={mealsIngredients[item.idMeal]}
        instructions={item.strInstructions}
        onPressFavorite={() =>
          addToFavorites(email ?? '', item.strMeal, token ?? '')
        }
        isFavorite={true}
        titleBackground={colors.darkOliveGreen}
      />
    );
  };

  return (
    <View style={localStyles.loading}>
      {isLoading === true && (
        <View style={localStyles.loading}>
          <LoadingScreen message={'Loading favorites...'} />
        </View>
      )}
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  listContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: 'transparent',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
