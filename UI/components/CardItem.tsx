import React from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
  ColorValue,
  TouchableOpacityProps,
} from 'react-native';
import {colors} from '../styles/colors';
import {Icon} from '@rneui/themed';

type headerProps = {
  title: String;
  color: ColorValue;
};

interface heartProps extends TouchableOpacityProps {
  heartBackgroundColor: ColorValue;
  onPress: () => void;
}

const FavoriteIcon = (props: heartProps) => {
  return (
    <View style={styles.favoriteContainer}>
      <TouchableOpacity
        style={[
          styles.heartIconContainer,
          {backgroundColor: props.heartBackgroundColor},
        ]}
        {...props}>
        <Icon name="heart" color={colors.white} size={20} type="ionicon" />
      </TouchableOpacity>
    </View>
  );
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
        <FavoriteIcon
          heartBackgroundColor={colors.goldenRod}
          onPress={() => null}
        />
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
    width: 180,
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
  favoriteContainer: {
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  heartIconContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
});
