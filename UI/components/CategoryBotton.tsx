import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ColorValue,
} from 'react-native';

// Declare the property types that this component will use
type Props = {
  title: String;
  backgroundColor: ColorValue;
  onPress: () => void;
};

export const CategoryBotton = (props: Props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={[{backgroundColor: props.backgroundColor}, buttonStyles.button]}>
        <Text style={buttonStyles.buttonText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    height: 68,
    width: 165,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'normal',
    fontFamily: 'Barlow',
  },
});
