import React, {useContext, useState} from 'react';
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
import {AuthContext} from '../auth/authContext';

export const Login = ({navigation}: NavigationProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {logIn} = useContext(AuthContext);
  const print = () => {
    console.log(email, password);
    setEmail('');
    setPassword('');
  };

  const URL = 'https://newpantry.herokuapp.com/api/login';
  const body = JSON.stringify({email: email, password: password});

  async function onLogin() {
    console.log(body);
    try {
      const response = await fetch(URL, {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const jsonResponse = await response;
      console.log(jsonResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
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

        <Button2 title={'login'} onPress={() => logIn(email, password)} />

        <View style={localStyles.message}>
          <Text style={localStyles.ask}>Not Registered?&nbsp;</Text>

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
  },
});
