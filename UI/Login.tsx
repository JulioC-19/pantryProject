import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomInput} from './components/CustomInput';
import {CustomButton} from './components/CustomButton';

export const Login = () => {
  return (
    <SafeAreaView>
      <CustomInput
        label="Username"
        placeholder="Enter username"
        iconName="user"
      />
      <CustomInput
        label="Password"
        placeholder="Enter password"
        iconName="lock"
        isPasswordField={true}
      />
      <CustomButton
        title={'Login'}
        onPress={() => Alert.prompt('Implement Signup logic!')}
      />
      <View>
        <Text style={styles.text}>Don't have an account?&nbsp;</Text>

        <TouchableOpacity>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },

  signup: {
    color: '#E91E63',
    textDecorationLine: 'underline',
  },

  container: {
    alignContent: 'center',
  },
});
