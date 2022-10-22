import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationProps} from './navigation/screenTypes';
import {TextInput2} from './components/TextInput2';
import {colors} from './styles/colors';
import {Button2} from './components/Button2';

export const Signup = ({navigation}: NavigationProps) => {
  return (
    <SafeAreaView>
      <View style={localStyle.formView}>
        <TextInput2 placeholder="Enter a user name" />
        <TextInput2 placeholder="Enter a user name" />
        <TextInput2 placeholder="email" />
        <TextInput2 placeholder="password" isPasswordField={true} />
        <TextInput2 placeholder="confirm password" isPasswordField={true} />

        <Button2
          title="sign up"
          onPress={() => Alert.alert('Implement Sign up!')}
        />

        <View style={localStyle.textContainer}>
          <Text style={localStyle.textStyle}>Already Registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home', {})}>
            <Text style={localStyle.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const localStyle = StyleSheet.create({
  formView: {
    flexDirection: 'column',
    top: 230,
  },
  textStyle: {
    color: colors.darkOliveGreen,
    fontStyle: 'normal',
  },
  textContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: colors.gleeful,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
});
