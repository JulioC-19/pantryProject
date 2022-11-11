import React from 'react';
import {
  Button,
  Modal,
  Text,
  View,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from './styles/colors';
import Icons from './styles/icons';

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

const data = [
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
      <Text key={props.id} style={{paddingLeft: 5}}>
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

export const RecipeScreen = (props: recipeScreenProps) => {
  function onHide() {
    if (props.onHide) {
      props.onHide();
    }
  }

  return (
    <Modal visible={props.isVisible} animationType="slide">
      <ScrollView>
        <Image
          source={props.source}
          resizeMode={'cover'}
          style={{width: '100%', height: 200}}
        />
        <Text>{props.recipeName}</Text>
        <View style={styles.container}>
          <IngredientList ingredientList={data} />
          <IngredientList ingredientList={data} />
        </View>
        <View>
          <Text>{props.instructions}</Text>
        </View>
        <Button title="Hide Me" onPress={onHide} />
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    flexDirection: 'row',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
