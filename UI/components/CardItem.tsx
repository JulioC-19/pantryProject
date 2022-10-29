import React from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  ColorValue,
} from 'react-native';

type headerProps = {
  title: String;
  color: ColorValue;
};

// TODO: Need to define proper properties for the list item
export const CardItem = (item: any) => {
  return (
    <TouchableOpacity onPress={() => Alert.alert(item.strMeal)}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: item.strMealThumb}}
        imageStyle={styles.cardRadius}>
        <View style={styles.textContainer}>
          <Text style={styles.text}> {item.strMeal}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export const ListHeader = (props: headerProps) => {
  return (
    <View style={styles.listHeaderContainer}>
      <Text style={[{color: props.color}, styles.textHeader]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: 160,
    height: 160,
    margin: 8,
    borderRadius: 20,
  },
  textContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  listHeaderContainer: {
    margin: 8,
  },
  textHeader: {
    fontSize: 20,
    fontFamily: 'Barlow',
    fontWeight: 'normal',
  },
  cardRadius: {
    borderRadius: 20,
  },
});
