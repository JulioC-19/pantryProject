import React from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomInput} from './components/CustomInput';
import {CustomButton} from './components/CustomButton';
import {NavigationProps} from './navigation/screenTypes';

export const Signup = ({navigation}: NavigationProps) => {
  return (
    <SafeAreaView>
      <CustomInput
        iconName="adduser"
        label="Username"
        placeholder="Enter a user name"
      />
      <CustomInput
        iconName="mail"
        label={'Email'}
        placeholder="Enter a valid email address"
      />
      <CustomInput
        iconName="lock"
        label={'Password'}
        placeholder="Enter password"
        isPasswordField={true}
      />

      <CustomButton
        title={'Sign up'}
        onPress={() => Alert.prompt('Implement Signup logic!')}
      />

      <View style={localStyle.textContainer}>
        <Text style={localStyle.textStyle}>Already have an account?</Text>
        <TouchableOpacity
          style={{paddingLeft: 5}}
          onPress={() => navigation.navigate('Home', {})}>
          <Text style={localStyle.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const localStyle = StyleSheet.create({
  textStyle: {
    color: 'black',
    fontStyle: 'normal',
  },
  textContainer: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
