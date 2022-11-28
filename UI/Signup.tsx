import React, {useEffect, useState} from 'react';
import {
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
const signupAPI = 'https://newpantry.herokuapp.com/api/signup';

export const Signup = ({navigation}: NavigationProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disable, setIsDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const md5 = require('md5');

  function emptyFields() {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  function checkEmptyFields() {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }

  const validateEmail = () => {
    // eslint-disable-next-line no-useless-escape
    const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return expression.test(String(email).toLowerCase());
  };

  const validateName = () => {
    const expression = /^[A-Za-z]{1,20}$/;
    return expression.test(String(firstName).toLowerCase());
  };

  const validateLastName = () => {
    const expression = /^[A-Za-z]{1,20}$/;
    return expression.test(String(lastName).toLowerCase());
  };

  const validatePassowrd = () => {
    const expression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return expression.test(String(password).toLowerCase());
  };

  const validateMatchingPasswords = () => {
    return password === confirmPassword;
  };

  const validateAll = () => {
    console.log(validateName());
    console.log(validateLastName());
    console.log(validateEmail());
    console.log(validatePassowrd());
    console.log(validateMatchingPasswords());

    return (
      validateEmail() &&
      validateLastName() &&
      validateName() &&
      validatePassowrd() &&
      validateMatchingPasswords()
    );
  };
  useEffect(() => {
    checkEmptyFields();
  });

  /**
   * Handles the sing up logic.
   * For now, it just display an alert with the user's first and last name.
   * Resets the fields after the sign up logic is executed.
   */
  const onSignUp = async () => {
    const validateInputs = validateAll();
    setIsDirty(true);
    if (validateInputs === true) {
      const md5Pass: string = md5(confirmPassword);
      const body = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: md5Pass,
        profilePicture: 'https://i.imgur.com/cEw6FVg.png',
      });
      console.log(body);
      try {
        const response = await fetch(signupAPI, {
          method: 'POST',
          body: body,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.status);
      } catch (error) {
        console.error(error);
      } finally {
        setIsDirty(false);
        emptyFields();
      }
    } else {
      console.log('INVALID INPUT');
    }
  };

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
          isValidInput={isDirty === true ? validateName() : true}
          inputType={'name'}
          value={firstName}
        />
        <TextInput2
          placeholder="last name"
          onChangeText={setLastName}
          isValidInput={isDirty === true ? validateLastName() : true}
          inputType={'name'}
          value={lastName}
        />
        <TextInput2
          placeholder="email"
          onChangeText={setEmail}
          value={email}
          isValidInput={isDirty === true ? validateEmail() : true}
          inputType={'email'}
        />
        <TextInput2
          placeholder="password"
          isPasswordField={true}
          onChangeText={setPassword}
          isValidInput={isDirty === true ? validatePassowrd() : true}
          inputType={'password'}
          value={password}
        />
        <TextInput2
          placeholder="confirm password"
          isPasswordField={true}
          onChangeText={setConfirmPassword}
          isValidInput={isDirty === true ? validateMatchingPasswords() : true}
          inputType={'confirmPassword'}
          value={confirmPassword}
        />
        <Button2 title="sign up" onPress={onSignUp} disable={disable} />

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
