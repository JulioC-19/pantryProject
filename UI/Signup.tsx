import React, {useState} from 'react';
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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  /**
   * Handles the sing up logic.
   * For now, it just display an alert with the user's first and last name.
   * Resets the fields after the sign up logic is executed.
   */
  function onSignUp() {
    Alert.alert(firstName + ' ' + lastName);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={localStyle.container}>
      <View style={localStyle.formContainer}>
        <View style={localStyle.logoContainer}>
          <Image source={require('./assets/men1.png')} />
        </View>
        <TextInput2
          placeholder="first name"
          onChangeText={setFirstName}
          value={firstName}
        />
        <TextInput2
          placeholder="last name"
          onChangeText={setLastName}
          value={lastName}
        />
        <TextInput2 placeholder="email" onChangeText={setEmail} value={email} />
        <TextInput2
          placeholder="password"
          isPasswordField={true}
          onChangeText={setPassword}
          value={password}
        />
        <TextInput2
          placeholder="confirm password"
          isPasswordField={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <Button2 title="sign up" onPress={onSignUp} />

        <View style={localStyle.textContainer}>
          <Text style={localStyle.textStyle}>Already Registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login', {})}>
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
