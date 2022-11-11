import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from '../styles/colors';

type LoadingModalProps = {
  message: string;
};

export const LoadingScreen = (props: LoadingModalProps) => {
  return (
    <View style={[modalStyle.spinnerStyle]}>
      <ActivityIndicator size={'large'} />
      <Text adjustsFontSizeToFit style={modalStyle.spinnerText}>
        {props.message ?? ''}
      </Text>
    </View>
  );
};

const modalStyle = StyleSheet.create({
  spinnerStyle: {
    backgroundColor: colors.white,
    opacity: 0.5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerText: {
    textAlign: 'center',
    fontSize: 24,
  },
});
