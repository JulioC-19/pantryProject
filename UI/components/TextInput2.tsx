import React, {useState} from 'react';
import {StyleSheet, TextInput, View, TextInputProps} from 'react-native';
import Icon from '../styles/icons';
import {colors} from '../styles/colors';
import {Text} from 'react-native-paper';

/**
 * Properties for the custom input
 * fields with ? indicate optional field as in the user is not required to use it but can add it on
 */
interface Props extends TextInputProps {
  label?: string;
  iconName?: string;
  isPasswordField?: boolean;
  isValidInput?: boolean;
  inputType?: string;
  isEditable?: boolean;
}

export const TextInput2 = (props: Props) => {
  const [hidePassword, setHidePassword] = useState(props.isPasswordField);

  return (
    <View style={inputStyle.parentView}>
      <View
        style={
          props.isValidInput === false
            ? inputStyle.inputContainerInvalid
            : inputStyle.inputContainer
        }>
        <Icon.AntDesign name={props.iconName} style={inputStyle.iconStyle} />
        <TextInput
          secureTextEntry={hidePassword}
          style={
            props.isValidInput === false
              ? inputStyle.textStyleInValid
              : inputStyle.textStyle
          }
          autoCorrect={false}
          editable={props.isEditable}
          {...props}
        />
        {props.isPasswordField && (
          <Icon.Ionicons
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={inputStyle.eyeIconStyle}
            onPress={() => setHidePassword(!hidePassword)} // Alternate between states
          />
        )}
      </View>
      {props.isValidInput === false && props.inputType === 'name' && (
        <Text style={inputStyle.invalidText}>
          Names can't contain numbers or special characters
        </Text>
      )}
      {props.isValidInput === false && props.inputType === 'email' && (
        <Text style={inputStyle.invalidText}>Invalid email format</Text>
      )}
      {props.isValidInput === false && props.inputType === 'password' && (
        <Text style={inputStyle.invalidText}>
          Password must at least 6 characters, contain at least a number and a
          special character
        </Text>
      )}
      {props.isValidInput === false &&
        props.inputType === 'confirmPassword' && (
          <Text style={inputStyle.invalidText}>Passwords do not match</Text>
        )}
    </View>
  );
};

const inputStyle = StyleSheet.create({
  parentView: {
    marginLeft: 45,
    marginRight: 45,
  },
  inputContainer: {
    marginVertical: 8,
    height: 43,
    backgroundColor: colors.gainsBoro,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 17,
  },
  inputContainerInvalid: {
    marginVertical: 8,
    height: 43,
    backgroundColor: colors.red,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 17,
    opacity: 0.2,
  },
  iconStyle: {
    color: 'gray',
    fontSize: 25,
    marginRight: 5,
  },
  eyeIconStyle: {
    color: 'gray',
    fontSize: 20,
    marginRight: 5,
  },
  textStyle: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontSize: 20,
    fontWeight: 'normal',
    flex: 1,
    color: '#797979',
    paddingTop: 0,
    paddingBottom: 0,
  },
  textStyleInValid: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontSize: 20,
    flex: 1,
    color: 'black',
  },
  invalidText: {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontWeight: 'normal',
    paddingLeft: 10,
    color: colors.red,
  },
});
