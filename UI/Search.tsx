import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {NavigationProps} from './navigation/screenTypes';
import {colors} from './styles/colors';
import Icons from './styles/icons';
import {CategoryBotton} from './components/CategoryBotton';
import {CardItem} from './components/CardItem';

export const Search = ({navigation}: NavigationProps) => {
  const [Keyword, setKeyword] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const categoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const ingredientURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

  const getCategoryMeals = async (category: string, url: string) => {
    try {
      const response = await fetch(url + category);
      const json = await response.json();
      //setMeals(jsonResult.meals.slice(0, 10));
      console.log(category);

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
          console.log('midpoint');
          listMeals.push(jsonMeals.meals[0]);
        } catch (error) {
          console.log('Error: ' + error);
        }
      }
      setMeals(listMeals);
      console.log('final: ' + meals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleModal();
    }
  };

  function handleModal() {
    setIsModalVisible(() => !isModalVisible);
  }

  return (
    <ScrollView>
      <View style={localStyles.container}>
        <Text style={localStyles.search}>SEARCH BY INGREDIENTS</Text>

        <View style={localStyles.parentView}>
          <View style={localStyles.inputContainer}>
            <Icons.Ionicons name="search" style={localStyles.iconStyle} />
            <TextInput
              style={localStyles.textStyle}
              value={Keyword}
              onChangeText={setKeyword}
              onSubmitEditing={() => {
                //Alert.alert('Searching for "' + Keyword + '"');
                //searchIngredients(Keyword);
                getCategoryMeals(Keyword, ingredientURL);
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
          <View style={localStyles.closeIcon}>
            <Icons.AntDesign
              name="arrowleft"
              color={'black'}
              size={30}
              onPress={handleModal}
            />
          </View>
          <View style={localStyles.searchContainer}>
            <Text style={localStyles.search}>SEARCH RESULT:</Text>
            <View style={localStyles.parentView}>
              <View style={localStyles.inputContainer}>
                <Icons.Ionicons name="search" style={localStyles.iconStyle} />
                <TextInput
                  style={localStyles.textStyle}
                  value={Keyword}
                  editable={false}
                  //onChangeText={setKeyword}
                  onSubmitEditing={() => {
                    console.log('Searching for "' + Keyword + '"');
                  }}
                />
              </View>
            </View>
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
    marginVertical: '6%',
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

  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  searchContainer: {
    marginTop: '8%',
    marginHorizontal: '6%',
  },
  resultContainer: {
    alignItems: 'center',
    paddingBottom: 200,
    marginBottom: 8,
  },
});
