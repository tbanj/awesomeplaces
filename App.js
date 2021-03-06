/* eslint-disable prettier/prettier */
/* https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import AuthScreen from './src/screens/Auth';
import startMainTabs from './src/screens/maintabs/startMainTabs';
import PlaceDetail from './src/screens/placedetail/PlaceDetail';
import SharePlace from './src/screens/shareplace/SharePlace';
import FindPlace from './src/screens/findplace/FindPlace';

import configureStore from './src/store/configureStore';
import MenuScreen from './src/screens/menu/MenuScreen';

const store = configureStore();

// Register screens: below are components which u can only attach redux state to
Navigation.registerComponent('AuthScreen', () => (props) => (
    <Provider store={store}>
        <AuthScreen {...props} />
    </Provider>
), () => AuthScreen);

Navigation.registerComponent('awesome-places.Share Place', () => (props) => (
    <Provider store={store}>
        <SharePlace {...props} />
    </Provider>
), () => SharePlace);

Navigation.registerComponent('awesome-places.Find Place', () => (props) => (
    <Provider store={store}>
        <FindPlace {...props} />
    </Provider>
), () => FindPlace);

Navigation.registerComponent('awesome-places.Place Detail', () => (props) => (
    <Provider store={store}>
        <PlaceDetail {...props} />
    </Provider>
), () => PlaceDetail);

Navigation.registerComponent('awesome-places.MenuScreen', () => (props) => (
    <Provider store={store}>
        <MenuScreen {...props} />
    </Provider>
), () => MenuScreen);
// Navigation.setRoot(startMainTabs);
const loginRoot = {
    root: { component: { name: 'AuthScreen' } },
};



Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot(loginRoot);

});




