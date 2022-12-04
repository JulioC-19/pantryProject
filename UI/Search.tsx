import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {colors} from './styles/colors';
import Icons from './styles/icons';
import {CategoryBotton} from './components/CategoryBotton';
import {CardItem} from './components/CardItem';
import {AuthContext} from '../auth/authContext';
import {getIngredientList, mealWithIngredients} from './HomeScreen';

export const Search = () => {
  const {email, token, addToFavorites} = useContext(AuthContext);
  const [Keyword, setKeyword] = useState('');
  const [Ingredient, setIngredient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [favMeals, setFavMeals] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [message, setMessage] = useState('');
  const [mealsIngredients, setMealsIngredients] = useState<mealWithIngredients>(
    {},
  );

  const categoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const ingredientURL =
    'https://www.themealdb.com/api/json/v2/9973533/filter.php?i=';
  const favURL = 'https://newpantry.herokuapp.com/api/favorites';

  const getCategoryMeals = async (category: string, url: string) => {
    setMeals([]);
    handleModal();
    setIsLoading(true);
    try {
      const response = await fetch(url + category);
      const json = await response.json();
      if (json.meals === null) {
        setIsLoading(false);
        setMessage('No recipes were found.');
      } else {
        let listMeals: any = [];
        for (let i = 0; i < 10; i++) {
          if (json.meals[i] == null) {
            continue;
          }
          try {
            const response2 = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${json.meals[i].idMeal}`,
            );
            const jsonMeals = await response2.json();
            listMeals.push(jsonMeals.meals[0]);
          } catch (error) {
            console.log('Error: ' + error);
          }
        }
        setMeals(listMeals);
        let ingredientList = getIngredientList(listMeals);
        setMealsIngredients(ingredientList);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleModal() {
    if (isModalVisible === true) {
      setMessage('');
    }
    setIsModalVisible(() => !isModalVisible);
  }

  useEffect(() => {
    const getUserFavRecipies = async () => {
      try {
        const body = JSON.stringify({email: email});
        const response = await fetch(favURL, {
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
    getUserFavRecipies();
  }, [email, token]);

  return (
    <ScrollView>
      <View style={localStyles.container}>
        <Text style={localStyles.search}>SEARCH BY INGREDIENTS</Text>

        <View style={localStyles.parentView}>
          <View style={localStyles.inputContainer}>
            <Icons.Ionicons name="search" style={localStyles.iconStyle} />
            <TextInput
              style={localStyles.textStyle}
              placeholder="ex: egg,milk"
              value={Ingredient}
              onChangeText={setIngredient}
              onSubmitEditing={() => {
                if (Ingredient !== '') {
                  setKeyword(Ingredient);
                  getCategoryMeals(Ingredient, ingredientURL);
                }
              }}
            />
          </View>
        </View>

        <Text style={localStyles.categories}>CATEGORIES</Text>
        <ScrollView>
          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Breakfast'}
              backgroundColor={colors.gleeful}
              onPress={() => {
                setKeyword('Breakfast');
                getCategoryMeals('Breakfast', categoryURL);
              }}
            />
            <CategoryBotton
              title={'Starter'}
              backgroundColor={colors.fullYellow}
              onPress={() => {
                setKeyword('Starter');
                getCategoryMeals('Starter', categoryURL);
              }}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Side'}
              backgroundColor={colors.goldenRod}
              onPress={() => {
                setKeyword('Side');
                getCategoryMeals('Side', categoryURL);
              }}
            />
            <CategoryBotton
              title={'Beef'}
              backgroundColor={colors.mandarinRed}
              onPress={() => {
                setKeyword('Beef');
                getCategoryMeals('Beef', categoryURL);
              }}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Chicken'}
              backgroundColor={colors.mandarinRed}
              onPress={() => {
                setKeyword('Chicken');
                getCategoryMeals('Chicken', categoryURL);
              }}
            />
            <CategoryBotton
              title={'Pork'}
              backgroundColor={colors.mandarinRed}
              onPress={() => {
                setKeyword('Pork');
                getCategoryMeals('Pork', categoryURL);
              }}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Lamb'}
              backgroundColor={colors.mandarinRed}
              onPress={() => {
                setKeyword('Lamb');
                getCategoryMeals('Lamb', categoryURL);
              }}
            />
            <CategoryBotton
              title={'Goat'}
              backgroundColor={colors.mandarinRed}
              onPress={() => {
                setKeyword('Goat');
                getCategoryMeals('Goat', categoryURL);
              }}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Seafood'}
              backgroundColor={colors.mountainIris}
              onPress={() => {
                setKeyword('Seafood');
                getCategoryMeals('Seafood', categoryURL);
              }}
            />
            <CategoryBotton
              title={'Miscellaneous'}
              backgroundColor={colors.goldenRod}
              onPress={() => {
                setKeyword('Miscellaneous');
                getCategoryMeals('Miscellaneous', categoryURL);
              }}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Pasta'}
              backgroundColor={colors.goldenRod}
              onPress={() => {
                setKeyword('Pasta');
                getCategoryMeals('Pasta', categoryURL);
              }}
            />
            <CategoryBotton
              title={'Dessert'}
              backgroundColor={colors.fullYellow}
              onPress={() => {
                setKeyword('Dessert');
                getCategoryMeals('Dessert', categoryURL);
              }}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Vegan'}
              backgroundColor={colors.darkOliveGreen}
              onPress={() => {
                setKeyword('Vegan');
                getCategoryMeals('Vegan', categoryURL);
              }}
            />
            <CategoryBotton
              title={'Vegetarian'}
              backgroundColor={colors.gleeful}
              onPress={() => {
                setKeyword('Vegetarian');
                getCategoryMeals('Vegetarian', categoryURL);
              }}
            />
          </View>
        </ScrollView>

        <Modal animationType="slide" visible={isModalVisible}>
          <View style={localStyles.searchContainer}>
            <Icons.AntDesign
              name="arrowleft"
              color={'black'}
              size={30}
              onPress={handleModal}
            />
            <Text style={localStyles.search}>
              Search result: {Keyword.toUpperCase()}
            </Text>
          </View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              <View style={localStyles.resultContainer}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={meals}
                  numColumns={2}
                  horizontal={false}
                  keyExtractor={(item: any) => {
                    return item.idMeal;
                  }}
                  renderItem={({item}: any) => (
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
                  )}
                />
              </View>
            </>
          )}
          <Text style={localStyles.noResult}>{message}</Text>
        </Modal>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginVertical: '4%',
    marginHorizontal: '4%',
  },
  search: {
    marginVertical: '4%',
    paddingLeft: 4,
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Barlow',
    color: colors.darkOliveGreen,
  },

  parentView: {
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    height: 50,
    backgroundColor: '#E3E3E3',
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 50,
  },
  iconStyle: {
    color: 'gray',
    fontSize: 25,
    marginRight: 5,
  },
  textStyle: {
    flex: 1,
    color: 'black',
    fontFamily: 'Barlow',
  },

  categories: {
    paddingLeft: 4,
    marginBottom: 6,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Barlow',
    color: 'black',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  //Modal
  searchContainer: {
    marginTop: '6%',
    marginHorizontal: '4%',
  },
  resultContainer: {
    alignItems: 'center',
    paddingBottom: 120,
    marginBottom: 4,
  },
  noResult: {
    fontSize: 20,
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    color: colors.goldenRod,
    alignSelf: 'center',
  },
});
