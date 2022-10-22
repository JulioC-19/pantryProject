import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {colors} from '../styles/colors';

// Declare the property types that this component will use
type Props = {
  title: String;
  onPress: () => void;
};

export const Button2 = ({title, onPress}: Props) => {
  return (
    <View style={buttonStyles.buttonContainer}>
      <TouchableOpacity onPress={onPress} style={buttonStyles.button}>
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
  buttonText: {
    fontFamily: 'Barlow',
    color: 'white',
    fontWeight: 'normal',
    fontSize: 18,
  },
});
