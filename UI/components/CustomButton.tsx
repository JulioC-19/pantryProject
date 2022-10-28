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
    width: '85%',
    //marginTop: 15,
    //marginBottom: 5,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#a5ba78',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 17,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
