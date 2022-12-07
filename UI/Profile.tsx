import React, {useContext, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {colors} from './styles/colors';
import {AuthContext} from '../auth/authContext';
import {Button2} from './components/Button2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput2} from './components/TextInput2';
const editProfileAPI = 'https://newpantry.herokuapp.com/api/editProfile';

export const ProfileScreen = () => {
  const {logOut} = useContext(AuthContext);
  const {firstName, lastName, email, password, profilePicture, token} =
    useContext(AuthContext);

  // This tells TS that these values will never be null
  // and solved 'Not Assignable To Type' error
  const fn: string = firstName!;
  const ln: string = lastName!;
  const em: string = email!;
  const pw: string = password!;
  const pic: string = profilePicture!;
  const tk: string = token!;
  const [newFirstName, setFirstName] = useState(fn);
  const [newLastName, setLastName] = useState(ln);
  const [newPassword, setPassword] = useState('');
  const md5 = require('md5');

  const [message, setMessage] = useState('');
  const [errorName, setErrorName] = useState('');

  const body = JSON.stringify({
    email: email,
    firstName: newFirstName,
    lastName: newLastName,
    password: md5(newPassword),
  });
  const body2 = JSON.stringify({
    email: email,
    firstName: newFirstName,
    lastName: newLastName,
    password: pw,
  });

  const onEdit = async () => {
    setMessage('');
    setErrorName('');
    const validateInputs = validateAll();
    if (validateInputs === true) {
      try {
        if (newPassword === '') {
          await fetch(editProfileAPI, {
            method: 'POST',
            body: body2,
            headers: {
              'Content-Type': 'application/json',
              // eslint-disable-next-line prettier/prettier
              'Authorization': tk,
            },
          });
        } else {
          await fetch(editProfileAPI, {
            method: 'POST',
            body: body,
            headers: {
              'Content-Type': 'application/json',
              // eslint-disable-next-line prettier/prettier
              'Authorization': tk,
            },
          });
        }
      } catch (error) {
        console.error('ERROR: edit profile');
      } finally {
        setMessage('User profile updated.');
        await AsyncStorage.setItem('@firstName', newFirstName);
        await AsyncStorage.setItem('@lastName', newLastName);
        await AsyncStorage.setItem('@password', newPassword);
      }
    }
  };

  const validateName = () => {
    const expression = /^[A-Za-z]{1,20}$/;
    return expression.test(String(newFirstName).toLowerCase());
  };

  const validateLastName = () => {
    const expression = /^[A-Za-z]{1,20}$/;
    return expression.test(String(newLastName).toLowerCase());
  };

  const validatePassowrd = () => {
    const expression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return expression.test(String(newPassword).toLowerCase());
  };

  const validateAll = () => {
    if (!validateName() || !validateLastName()) {
      setErrorName("Names can't contain numbers or special characters");
    }

    if (newPassword === '') {
      return validateLastName() && validateName();
    } else {
      if (!validatePassowrd()) {
        setErrorName(
          'Password must at least 6 characters, contain at least a number and a special character',
        );
      }
      return validateLastName() && validateName() && validatePassowrd();
    }
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={localStyle.container}>
        <Image source={{uri: pic}} style={localStyle.img} />
        <View>
          <Text style={localStyle.errorMessage}>{errorName}</Text>
          <TextInput2
            placeholder={fn}
            value={newFirstName}
            onChangeText={setFirstName}
          />
          <TextInput2
            placeholder={ln}
            value={newLastName}
            onChangeText={setLastName}
          />

          <TextInput2 placeholder="password" value={em} editable={false} />

          <TextInput2
            isPasswordField={true}
            placeholder="password"
            value={newPassword}
            onChangeText={setPassword}
          />

          <Button2 title="Edit Profile" onPress={onEdit} />
          <Text style={localStyle.message}>{message}</Text>

          <View style={localStyle.align}>
            <TouchableOpacity onPress={async () => logOut()}>
              <Text style={localStyle.text}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const localStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 6,
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 200,
    marginTop: '6%',
    alignSelf: 'center',
  },
  text: {
    color: colors.mountainIris,
    fontSize: 16,
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  message: {
    color: colors.darkOliveGreen,
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  errorMessage: {
    marginHorizontal: 10,
    color: colors.mandarinRed,
    fontFamily: 'Barlow',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  align: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
