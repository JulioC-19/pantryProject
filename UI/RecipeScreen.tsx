import React from 'react';
import {
  Modal,
  Text,
  View,
  ImageSourcePropType,
  StyleSheet,
  ImageBackground,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from './styles/colors';
import Icons from './styles/icons';
import {FavoriteIcon} from './components/CardItem';

type ingredientItem = {
  id: string;
  name: string;
};

type IngredientListProps = {
  ingredientList: ingredientItem[];
};

type recipeScreenProps = {
  recipeName: string;
  ingredients?: ingredientItem[];
  instructions?: string;
  isVisible: boolean;
  source: ImageSourcePropType;
  onHide?: () => void;
};

const list = [
  {
    id: '1',
    name: 'First Item',
  },
  {
    id: '2',
    name: 'Second Item',
  },
  {
    id: '3',
    name: 'Third Item',
  },
  {
    id: '4',
    name: 'Fourth Item',
  },
  {
    id: '5',
    name: 'Fith Item',
  },
];

const IngredientItem = (props: ingredientItem) => {
  return (
    <View style={{flexDirection: 'row'}} key={props.id}>
      <Icons.Octicons name="dot-fill" color={colors.goldenRod} size={24} />
      <Text key={props.id} style={styles.ingredientText}>
        {props.name}
      </Text>
    </View>
  );
};

const IngredientList = (props: IngredientListProps) => {
  return (
    <View style={{flexDirection: 'column'}}>
      {props.ingredientList.map(item => (
        <IngredientItem id={item.id} name={item.name} />
      ))}
    </View>
  );
};

const Ingredients = (props: {
  list: ingredientItem[];
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={props.containerStyle}>
      <Text style={styles.header}>INGREDIENTS</Text>
      <View style={styles.container}>
        {/*TODO: This list needs to be sliced in half*/}
        <IngredientList ingredientList={props.list} />
        <IngredientList ingredientList={props.list} />
      </View>
    </View>
  );
};

const Directions = (props: {
  directions: string;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={props.containerStyle}>
      <Text style={styles.header}>DIRECTIONS</Text>
      <Text>{props.directions}</Text>
    </View>
  );
};

const RecipeName = (props: {
  recipeName: string;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={styles.recipeNameContainer}>
      <Text style={styles.recipeName}>{props.recipeName}</Text>
    </View>
  );
};

export const RecipeScreen = (props: recipeScreenProps) => {
  function onHide() {
    if (props.onHide) {
      props.onHide();
    }
  }

  return (
    <Modal visible={props.isVisible} animationType="slide">
      <ScrollView>
        <View>
          <ImageBackground
            source={props.source}
            resizeMode={'cover'}
            style={styles.image}
          />
          <View style={styles.closeIcon}>
            <Icons.AntDesign
              name="close"
              color={'black'}
              size={30}
              onPress={onHide}
            />
          </View>
          <FavoriteIcon
            heartBackgroundColor={colors.fullYellow}
            onPress={() => null}
            containerStyle={styles.favoriteContainer}
          />
        </View>
        <RecipeName recipeName={props.recipeName} />
        <Ingredients containerStyle={styles.boxContainer} list={list} />
        <Directions
          containerStyle={styles.boxContainer}
          directions={props.instructions ?? ''}
        />
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: {
    fontSize: 24,
    paddingBottom: 5,
    color: colors.darkOliveGreen,
  },
  recipeNameContainer: {
    alignItems: 'center',
  },
  recipeName: {
    fontSize: 32,
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'row',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  image: {
    width: '100%',
    height: 280,
    opacity: 0.8,
  },
  favoriteContainer: {
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  boxContainer: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  ingredientText: {
    fontSize: 20,
    paddingLeft: 5,
    fontFamily: 'Barlow',
  },
});
