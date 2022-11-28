import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {colors} from '../styles/colors';

// Declare the property types that this component will use
type Props = {
  title: String;
  onPress: () => void;
  disable?: boolean;
};

export const Button2 = ({title, onPress, disable}: Props) => {
  return (
    <View style={buttonStyles.buttonContainer}>
      <TouchableOpacity
        onPress={onPress}
        style={
          disable === true ? buttonStyles.buttonDisable : buttonStyles.button
        }
        disabled={disable}>
        <Text style={buttonStyles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 8,
    paddingLeft: 45,
    paddingRight: 45,
  },
  button: {
    flexDirection: 'row',
    height: 43,
    backgroundColor: colors.gleeful,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
  },
  buttonDisable: {
    flexDirection: 'row',
    height: 43,
    backgroundColor: colors.fullYellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'Barlow',
    color: 'white',
    fontWeight: 'normal',
    fontSize: 18,
  },
});
