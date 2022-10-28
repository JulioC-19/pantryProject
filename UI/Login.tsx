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


export const Login = ({navigation}: NavigationProps) => {
    function onLogin() {
        Alert.alert("Login successful!")
    }
    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{flex:1}}
        >
            <View style={localStyles.container}>
                <Image source={require('./assets/pantry.png')} style={localStyles.logo}/>
                <TextInput2
                    placeholder= 'username'
                />

                <TextInput2
                    placeholder='password'
                    isPasswordField={true}
                />

                <Button2
                    title={'login'}
                    onPress={onLogin}
                />

                <View style={localStyles.message}>
                    <Text style={localStyles.ask}>Not Registered?&nbsp;</Text>
                
                    <TouchableOpacity onPress={() => navigation.navigate('Signup', {})}>
                        <Text style={localStyles.askSignup}>Sign Up</Text>
                    </TouchableOpacity>
                
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}


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

})