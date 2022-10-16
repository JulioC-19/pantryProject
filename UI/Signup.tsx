import React from 'react';
import {Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomInput} from './components/CustomInput';
import {CustomButton} from './components/CustomButton';

export const Signup = () => {
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
    </SafeAreaView>
  );
};
