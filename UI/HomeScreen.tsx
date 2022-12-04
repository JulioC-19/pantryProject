import React, {useEffect, useState, useContext, useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {CardItem, ListHeader} from './components/CardItem';
import {colors} from './styles/colors';
import {AuthContext} from '../auth/authContext';
import {ingredientItem} from './RecipeScreen';

const URL = 'https://newpantry.herokuapp.com/api/favorites';

export type mealWithIngredients = {
  [idMeal: string]: ingredientItem[];
};

/**
 * Takes in a list of objects meals and return a list of object ingredients
 * Each ingredients has an index, this is necessary for the fatlist
 * @param meals
 * @returns
 */
export const getIngredientList = (meals: any) => {
  let mealsIngredientsTemp: mealWithIngredients = {};
  let ingredientList: ingredientItem[] = [];
  let idMeal = '';
  meals.forEach((meal: any) => {
    idMeal = meal.idMeal;
    for (let i = 0; i < 20; i++) {
      let ingredient = `strIngredient${i + 1}`;
      if (meal[ingredient] === '' || meal[ingredient] === null) {
        break;
      }
      let measurement = `strMeasure${i + 1}`;
      if (meal[measurement] === '' || meal[measurement] === null) {
        break;
      }
      let ingredientItemTemp = meal[measurement] + ' ' + meal[ingredient];
      ingredientList.push({id: i.toString(), name: ingredientItemTemp});
    }
    mealsIngredientsTemp[idMeal] = ingredientList;
    ingredientList = [];
  });

  return mealsIngredientsTemp;
};

export const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [latestMeals, setLatestMeals] = useState([]);
  const [favMeals, setFavMeals] = useState<string[]>([]);
  const [mealsIngredients, setMealsIngredients] = useState<mealWithIngredients>(
    {},
  );
  const [mealsIngredients2, setMealsIngredients2] =
    useState<mealWithIngredients>({});
  const {email, token, addToFavorites} = useContext(AuthContext);

  const getLastestMeals = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v2/9973533/latest.php',
      );
      const jsonMeals = await response.json();
      let ingredientList = getIngredientList(jsonMeals.meals);
      setLatestMeals(jsonMeals.meals.slice(0, 5));
      setMealsIngredients2(ingredientList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomMeals = async () => {
    try {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v2/9973533/randomselection.php',
      );
      const jsonMeals = await response.json();
      let ingredientList = getIngredientList(jsonMeals.meals);
      setMeals(jsonMeals.meals);
      setMealsIngredients(ingredientList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserFavRecipies = async () => {
      try {
        const body = JSON.stringify({email: email});
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
        setFavMeals(json);
      } catch (error) {
        console.log('ERROR: ' + error);
      }
    };
    getRandomMeals();
    getLastestMeals();
    getUserFavRecipies();
  }, [email, token]);

  const onRefreshRandomMeals = useCallback(() => {
    const getUserFavRecipies = async () => {
      try {
        const body = JSON.stringify({email: email});
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
        setFavMeals(json);
      } catch (error) {
        console.log('ERROR: ' + error);
      }
    };
    getRandomMeals();
    getUserFavRecipies();
  }, [email, token]);

  const onRefreshLatestMeals = useCallback(() => {
    const getUserFavRecipies = async () => {
      try {
        const body = JSON.stringify({email: email});
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
        setFavMeals(json);
      } catch (error) {
        console.log('ERROR: ' + error);
      }
    };
    getLastestMeals();
    getUserFavRecipies();
  }, [email, token]);

  const cardItemSeasonal = (item: {
    strMealThumb: string;
    strMeal: string;
    idMeal: string;
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
        isFavorite={favMeals.includes(item.strMeal)}
      />
    );
  };

  const cardItemTrending = (item: {
    strMealThumb: string;
    strMeal: string;
    idMeal: string;
    strInstructions: string | undefined;
  }) => {
    return (
      <CardItem
        uri={item.strMealThumb}
        title={item.strMeal}
        ingredientList={mealsIngredients2[item.idMeal]}
        instructions={item.strInstructions}
        onPressFavorite={() =>
          addToFavorites(email ?? '', item.strMeal, token ?? '')
        }
        isFavorite={favMeals.includes(item.strMeal)}
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
              renderItem={({item}: any) => cardItemSeasonal(item)}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={onRefreshRandomMeals}
                />
              }
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
              renderItem={({item}: any) => cardItemTrending(item)}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={onRefreshLatestMeals}
                />
              }
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
