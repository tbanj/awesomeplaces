/* eslint-disable prettier/prettier */
import { Navigation } from 'react-native-navigation';
import AuthScreen from './src/screens/Auth';
// import DashboardScreen from './src/screens/maintabs/Dashboard';
import SettingScreen from './src/screens/maintabs/Setting';

// Navigation.setDefaultOptions({
//     statusBar: {
//         backgroundColor: '#4d089a',
//     },
//     topBar: {
//         title: {
//             color: 'white',
//         },
//         backButton: {
//             color: 'white',
//         },
//         background: {
//             color: '#4d089a',
//         },
//     },
//     bottomTab: {
//         fontSize: 14,
//         selectedFontSize: 14,
//     },
// });

//  Register Screen
Navigation.registerComponent('AuthScreen', () => AuthScreen);
// Navigation.registerComponent('DashboardScreen', () => DashboardScreen);
Navigation.registerComponent('SettingScreen', () => SettingScreen);

Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                children: [
                    {
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
                ],
            },
        },
    });
});

//  Register Screens
/* Navigation.registerComponent('DashboardScreen', () => DashboardScreen);
Navigation.registerComponent('Settings', () => SettingScreen); */
/* multiple screens
Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot({
        root: {
            bottomTabs: {
                children: [
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: 'DashboardScreen',
                                    },
                                },
                            ],
                        },
                    },
                    {
                        stack: {
                            children: [
                                {
                                    component: {
                                        name: 'Settings',
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });
}); */

//   const styles = StyleSheet.create({
//     root: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: 'whitesmoke'
//     }
//   });
