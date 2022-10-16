import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

// Declare the property types that this component will use
type Props = {
  title: String;
  onPress: () => void;
};

export const CustomButton = ({title, onPress}: Props) => {
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
    width: '100%',
    padding: 15,
  },
  button: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'rgb(34, 145, 132)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
