/* eslint-disable prettier/prettier */
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider, connect } from 'react-redux';
import AuthScreen from './src/screens/Auth';
import startMainTabs from './src/screens/maintabs/startMainTabs';
// import DashboardScreen from './src/screens/maintabs/Dashboard';
import PlaceDetail from './src/screens/placedetail/PlaceDetail';
import SharePlace from './src/screens/shareplace/SharePlace';
import FindPlace from './src/screens/findplace/FindPlace';

import configureStore from './src/store/configureStore';

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

// Navigation.setRoot(startMainTabs);
const loginRoot = {
    root: {
        component: {
            name: 'AuthScreen',
        },
    },
};



Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setRoot(loginRoot);
    // Navigation.setRoot(startMainTabs);
    // Navigation.setDefaultOptions({
    //     bottomTab: {
    //         selectedFontSize: 14,
    //         selectedTextColor: 'blue',
    //     },
    // });

    // Navigation.mergeOptions('root', {
    //     bottomTab: {
    //         animateBadge: true,
    //         dotIndicator: {
    //             animate: true, visible: true,
    //         },
    //     },
    //     // bottomTabs: {
    //     //     animate: true,
    //     // },
    // });

    Navigation.mergeOptions(startMainTabs.root.bottomTabs.children[0].stack.id, {
        bottomTab: {
            iconColor: '#FF1493',
            textColor: 'red',
            animateBadge: true,
            dotIndicator: {
                animate: true,
                visible: true,
            },
        },
        bottomTabs: {
            animate: true,
        },
    });

    Navigation.mergeOptions(startMainTabs.root.bottomTabs.children[1].stack.id, {

        bottomTab: {
            // textColor: 'red',
            animateBadge: true,
            dotIndicator: {
                animate: true,
                visible: true,
            },
        },
        bottomTabs: {
            animate: true,
        },
    });

});

Navigation.events().registerAppLaunchedListener(async () => {
    // Navigation.setRoot(startMainTabs);
    // Navigation.mergeOptions(startMainTabs.root.bottomTabs.children[0].stack.id, {
    //     bottomTab: {
    //         iconColor: '#FF1493',
    //         textColor: 'red',
    //         animateBadge: true,
    //         dotIndicator: {
    //             animate: true,
    //             visible: true,
    //         },
    //     },
    //     bottomTabs: {
    //         animate: true,
    //     },
    // });

    // Navigation.mergeOptions(startMainTabs.root.bottomTabs.children[1].stack.id, {

    //     bottomTab: {
    //         // textColor: 'red',
    //         animateBadge: true,
    //         dotIndicator: {
    //             animate: true,
    //             visible: true,
    //         },
    //     },
    //     bottomTabs: {
    //         animate: true,
    //     },
    // });
});




