import type {NativeStackScreenProps} from '@react-navigation/native-stack';
/**
 * Define the screens that the app will contain
 */
export type StackParamList = {
  Home: {};
  Signup: {} | undefined;
  Login: {} | undefined;
  Search: {} | undefined;
  LoadingScreen: {} | undefined;
  PantryScreen: {} | undefined;
};

/**
 * To type check our screens,
 * we need to annotate the navigation prop and
 * the route prop received by a screen.
 * In this case, our NavigationProps will annotate and
 * make sure that we can only navigate to the screens that are
 * defined in StackParamList.
 * Trying to navigate to an undefined screen will throw an error.
 */
export type NavigationProps = NativeStackScreenProps<StackParamList>;
export type homeRouteProps = NativeStackScreenProps<StackParamList, 'Home'>;
