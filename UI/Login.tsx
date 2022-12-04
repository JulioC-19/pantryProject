import React, {useContext, useState} from 'react';
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
import {AuthContext} from '../auth/authContext';
import Toast from 'react-native-toast-message';

const URL = 'https://newpantry.herokuapp.com/api/forgotPass';
export const Login = ({navigation}: NavigationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {logIn} = useContext(AuthContext);

  const handleForgotPassword = async () => {
    if (email === '') {
      Toast.show({
        type: 'info',
        text1: 'Please enter a valid email',
        visibilityTime: 4000,
        autoHide: true,
      });
      return;
    }
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Recovery email sent, Please check your email',
          visibilityTime: 4000,
          autoHide: true,
        });
      } else if (response.status === 404) {
        Toast.show({
          type: 'error',
          text1: 'Email not found, try again',
          visibilityTime: 4000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={localStyles.flexOne}>
      <View style={localStyles.container}>
        <Image
          source={require('./assets/pantry.png')}
          style={localStyles.logo}
        />
        <TextInput2 placeholder="email" onChangeText={setEmail} value={email} />

        <TextInput2
          placeholder="password"
          isPasswordField={true}
          onChangeText={setPassword}
          value={password}
        />

        <TouchableOpacity
          style={localStyles.forgotPass}
          onPress={handleForgotPassword}>
          <Text style={localStyles.ask}>Forgot password?</Text>
        </TouchableOpacity>

        <Button2 title={'login'} onPress={() => logIn(email, password)} />

        <View style={localStyles.message}>
          <Text style={localStyles.ask}>Not Registered?</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Signup', {})}>
            <Text style={localStyles.askSignup}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const localStyles = StyleSheet.create({
  logo: {
    marginVertical: '5%',
    width: 340,
    height: 340,
    alignSelf: 'center',
  },
  container: {
    justifyContent: 'flex-end',
  },
  message: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '3%',
    marginBottom: '5%',
  },
  ask: {
    color: colors.darkOliveGreen,
    fontSize: 14,
  },
  askSignup: {
    color: colors.gleeful,
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  forgotPass: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '2%',
    marginBottom: '2%',
  },
  flexOne: {flex: 1},
});
