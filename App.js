/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider, connect } from 'react-redux';
import AuthScreen from './src/screens/Auth';
import startMainTabs from './src/screens/maintabs/startMainTabs';
// import DashboardScreen from './src/screens/maintabs/Dashboard';
// import SideDrawer from './src/screens/sideDrawer/SideDrawer';
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

// registering sideDrawer without redux store
// Navigation.registerComponent('awesome-places.SideDrawer',
//     () => SideDrawer);

// registering sideDrawer with redux store
// Navigation.registerComponent('awesome-places.SideDrawer', () => (props) => (
//     <Provider store={store}>
//         <SideDrawer {...props} />
//     </Provider>
// ), () => SideDrawer);

// Navigation.setRoot(startMainTabs);
const loginRoot = {
    root: { component: { name: 'AuthScreen' } },
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

    // startMainTabs.root.bottomTabs.children[0].stack.id,
    Navigation.mergeOptions(startMainTabs.root.sideMenu.center.bottomTabs.children[0].stack.id, {
        bottomTab: {
            // iconColor: '#FF1493',
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

    Navigation.mergeOptions(startMainTabs.root.sideMenu.center.bottomTabs.children[1].stack.id, {

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


    Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {

        sideMenu: {
            left: {
                visible: true,
            },
        },
    });

});

// Navigation.events().registerAppLaunchedListener(async () => {
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
// });




