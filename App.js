/* eslint-disable prettier/prettier */
import { Navigation } from 'react-native-navigation';
import AuthScreen from './src/screens/Auth';

//  Register Screens
Navigation.registerComponent('AuthScreen', () => AuthScreen);

// Start a App
// Navigation.startSingleScreenApp({
//     screen: {
//         screen: 'awesome-places.AuthScreen',
//         title: 'Login',
//     },
// });


Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
        root: {
            stack: {
                children: [
                    {
                        component: {
                            name: 'AuthScreen',
                        },
                    },
                ],
            },
        },
    });
});

//   const styles = StyleSheet.create({
//     root: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: 'whitesmoke'
//     }
//   });
