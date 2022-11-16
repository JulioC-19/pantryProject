import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import {NavigationProps} from './navigation/screenTypes';
import {colors} from './styles/colors';
import Icon from './styles/icons';
import {CategoryBotton} from './components/CategoryBotton';

export const Search = ({navigation}: NavigationProps) => {
  const [Keyword, setKeyword] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);

  const URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  function recipePage() {}

  const getCategoryMeals = async (categoryChoice: string) => {
    try {
      const response = await fetch(URL + categoryChoice);
      const jsonMeals = await response.json();
      setMeals(jsonMeals.meals);
      console.log(meals);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={localStyles.container}>
        <Text style={localStyles.search}>SEARCH BY INGREDIENTS</Text>

        <View style={localStyles.parentView}>
          <View style={localStyles.inputContainer}>
            <Icon.Ionicons name="search" style={localStyles.iconStyle} />
            <TextInput
              style={localStyles.textStyle}
              value={Keyword}
              onEndEditing={() => {
                //navigation.navigate('SearchResult', {});
                Alert.alert('Searching for "' + Keyword + '"');
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
              onPress={() => getCategoryMeals('Breakfast')}
            />
            <CategoryBotton
              title={'Starter'}
              backgroundColor={colors.fullYellow}
              onPress={recipePage}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Side'}
              backgroundColor={colors.goldenRod}
              onPress={recipePage}
            />
            <CategoryBotton
              title={'Beef'}
              backgroundColor={colors.mandarinRed}
              onPress={recipePage}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Chicken'}
              backgroundColor={colors.mandarinRed}
              onPress={recipePage}
            />
            <CategoryBotton
              title={'Pork'}
              backgroundColor={colors.mandarinRed}
              onPress={recipePage}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Lamb'}
              backgroundColor={colors.mandarinRed}
              onPress={recipePage}
            />
            <CategoryBotton
              title={'Goat'}
              backgroundColor={colors.mandarinRed}
              onPress={recipePage}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Seafood'}
              backgroundColor={colors.mountainIris}
              onPress={recipePage}
            />
            <CategoryBotton
              title={'Miscellaneous'}
              backgroundColor={colors.goldenRod}
              onPress={recipePage}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Pasta'}
              backgroundColor={colors.goldenRod}
              onPress={recipePage}
            />
            <CategoryBotton
              title={'Dessert'}
              backgroundColor={colors.fullYellow}
              onPress={recipePage}
            />
          </View>

          <View style={localStyles.buttonContainer}>
            <CategoryBotton
              title={'Vegan'}
              backgroundColor={colors.darkOliveGreen}
              onPress={recipePage}
            />
            <CategoryBotton
              title={'Vegetarian'}
              backgroundColor={colors.gleeful}
              onPress={recipePage}
            />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    marginVertical: '8%',
    marginHorizontal: '6%',
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
    justifyContent: 'space-between',
  },
});
