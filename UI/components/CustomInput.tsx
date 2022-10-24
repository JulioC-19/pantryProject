import {Text} from '@rneui/base';
import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from '../styles/icons';

/**
 * Properties for the custom input
 * fields with ? indicate optional field as in the user is not required to use it but can add it on
 */
type Props = {
  //label: string;
  placeholder: string;
  iconName: string;
  isPasswordField?: boolean;
};

export const CustomInput = (props: Props) => {
  const [hidePassword, setHidePassword] = useState(props.isPasswordField);

  return (
    <View style={inputStyle.parentView}>
      {/* <Text style={inputStyle.label}>{props.label}</Text> */}
      <View style={[inputStyle.inputContainer]}>
        <Icon.AntDesign name={props.iconName} style={inputStyle.iconStyle} />
        <TextInput
          secureTextEntry={hidePassword}
          style={inputStyle.textStyle}
          autoCorrect={false}
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
    </View>
  );
};

const inputStyle = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: 'gray',
  },
  parentView: {
    width: '85%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    height: 50,
    backgroundColor: '#d9d9d9',
    flexDirection: 'row',
    paddingHorizontal: 15,
    //borderWidth: 1,
    alignItems: 'center',
    borderRadius: 17,
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
    flex: 1,
    color: 'blackem',
  },
});
