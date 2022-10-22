import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Icon from '../styles/icons';
import {colors} from '../styles/colors';

/**
 * Properties for the custom input
 * fields with ? indicate optional field as in the user is not required to use it but can add it on
 */
type Props = {
  label?: string;
  placeholder: string;
  iconName?: string;
  isPasswordField?: boolean;
};

export const TextInput2 = (props: Props) => {
  const [hidePassword, setHidePassword] = useState(props.isPasswordField);

  return (
    <View style={inputStyle.parentView}>
      <View style={inputStyle.inputContainer}>
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
    color: 'blackem',
  },
});
