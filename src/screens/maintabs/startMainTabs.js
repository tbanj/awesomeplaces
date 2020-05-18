// /* eslint-disable prettier/prettier */
// import { Navigation } from 'react-native-navigation';

// import DashboardScreen from './Dashboard';
// import SettingScreen from './Setting';
// // Navigation.startTabBasedApp({
// //     tabs: [
// //         {
// //             screen: 'SettingScreen',
// //             screen: 'SettingScreen',
// //         },
// //     ],
// // });

// //  Register Screens
// Navigation.registerComponent('DashboardScreen', () => DashboardScreen);
// Navigation.registerComponent('SettingScreen', () => SettingScreen);
// // multiple screens
// Navigation.events().registerAppLaunchedListener(async () => {
//     Navigation.setRoot({
//         root: {
//             bottomTabs: {
//                 children: [
//                     {
//                         stack: {
//                             children: [
//                                 {
//                                     component: {
//                                         name: 'SettingScreen',
//                                     },
//                                 },
//                             ],
//                         },
//                     },
//                     {
//                         stack: {
//                             children: [
//                                 {
//                                     component: {
//                                         name: 'DashboardScreen',
//                                     },
//                                 },
//                             ],
//                         },
//                     },
//                 ],
//             },
//         },
//     });
// });

// //   const styles = StyleSheet.create({
// //     root: {
// //       flex: 1,
// //       alignItems: 'center',
// //       justifyContent: 'center',
// //       backgroundColor: 'whitesmoke'
// //     }
// //   });

// export default startMainTabs;


