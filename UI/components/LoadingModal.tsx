import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Text} from 'react-native-paper';
import {colors} from '../styles/colors';

type LoadingModalProps = {
  isVisible: boolean | undefined;
  message: string;
  onHide?: () => void;
  animationInTiming?: number;
  animationOutTiming?: number;
};

export const LoadingModal = (props: LoadingModalProps) => {
  function onHide() {
    if (props.onHide) {
      props.onHide();
    }
  }

  return (
    <Modal
      isVisible={props.isVisible}
      onModalHide={onHide}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={props.animationInTiming ?? 500}
      animationOutTiming={props.animationOutTiming ?? 500}>
      <View style={[modalStyle.spinnerStyle]}>
        <ActivityIndicator size={'large'} />
        <Text adjustsFontSizeToFit style={modalStyle.spinnerText}>
          {props.message ?? ''}
        </Text>
      </View>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  spinnerStyle: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 20,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  spinnerText: {
    textAlign: 'center',
    fontSize: 24,
  },
});
