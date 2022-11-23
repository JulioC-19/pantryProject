// App.jsx
import { ErrorToast, InfoToast, SuccessToast } from 'react-native-toast-message';
import { colors } from './colors';

/*
  1. Create the config
*/
export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `SuccessToast` component
  */
  success: (props) => (
    <SuccessToast
      {...props}
      style={{ borderLeftColor: colors.gleeful }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colors.mandarinRed }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'success' type,
    by modifying the existing `SuccessToast` component
  */
    info: (props) => (
        <InfoToast
          {...props}
          style={{ borderLeftColor: colors.fullYellow }}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          text1Style={{
            fontSize: 15,
            fontWeight: '400'
          }}
        />
      ),
};