import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {NavigationProps} from './navigation/screenTypes';
import {TextInput2} from './components/TextInput2';
import {colors} from './styles/colors';
import {Button2} from './components/Button2';

export const Signup = ({navigation}: NavigationProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={localStyle.container}>
      <View style={localStyle.formContainer}>
        <View style={localStyle.logoContainer}>
          <Image source={require('./assets/men1.png')} />
        </View>
        <TextInput2 placeholder="first name" />
        <TextInput2 placeholder="last name" />
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
    </KeyboardAvoidingView>
  );
};

const localStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    justifyContent: 'flex-end',
  },
  logoContainer: {
    alignItems: 'center',
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
