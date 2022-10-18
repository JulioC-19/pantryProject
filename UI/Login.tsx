import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomInput } from './components/CustomInput';
import { CustomButton } from './components/CustomButton';

export const Login = () => {
    return(
        <SafeAreaView style={localStyles.container}>
            <CustomInput
                label= "Username"
                placeholder= "Enter username"
                iconName='user'
            />
            <CustomInput
                label='Password'
                placeholder='Enter password'
                iconName='lock'
                isPasswordField={true}
            />
            <CustomButton
                title={'Login'}
                onPress={() => Alert.prompt('Implement logic !')}
            />
            <View style={localStyles.message}>
            <Text>Not Registered?&nbsp;</Text>
            
                <TouchableOpacity>
                    <Text style={localStyles.signup}>Sign Up</Text>
                </TouchableOpacity>
                
            
            </View>

        </SafeAreaView>
    )
}


const localStyles = StyleSheet.create({
    
    message: {
        flexDirection: 'row',
        alignSelf: 'center'
    },

    signup: {
        color: '#E91E63',
        textDecorationLine: 'underline',
    },

    container: {
        top: '25%'
    }

})