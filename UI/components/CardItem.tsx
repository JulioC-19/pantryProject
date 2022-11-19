import React, {useState} from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  ColorValue,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {colors} from '../styles/colors';
import {Icon} from '@rneui/themed';
import {RecipeScreen} from '../RecipeScreen';

type headerProps = {
  title: String;
  color: ColorValue;
};

type cardItemProps = {
  uri: string;
  title: string;
  instructions?: string;
  userEmail?: string;
};

interface heartProps extends TouchableOpacityProps {
  heartBackgroundColor: ColorValue;
  containerStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
}
export const CardItem = (props: cardItemProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <RecipeScreen
        recipeName={props.title}
        isVisible={isVisible}
        source={{uri: props.uri}}
        onHide={() => setIsVisible(!isVisible)}
        instructions={props.instructions}
      />

      <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
        <ImageBackground
          style={styles.imageBackground}
          source={{uri: props.uri}}
          imageStyle={styles.cardRadius}>
          <View style={styles.textContainer}>
            <Text style={styles.text}> {props.title}</Text>
          </View>
          <FavoriteIcon
            heartBackgroundColor={colors.goldenRod}
            onPress={() => null}
          />
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export const FavoriteIcon = (props: heartProps) => {
  return (
    <View style={props.containerStyle ?? styles.favoriteContainer}>
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
