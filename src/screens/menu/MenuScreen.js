/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { Navigation } from 'react-native-navigation';
import startMainTabs from '../maintabs/startMainTabs';
// import SettingScreen from './maintabs/Setting';
class MenuScreen extends Component {
    constructor(props) {

        super(props);
        // Navigation.events().bindComponent(this);
        // Navigation.events().bindComponent(this);
        // this.navigationEventListener = Navigation.events().bindComponent(this);
        // Navigation.events().bindComponent(this);
        // Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
        //     console.log('buttonId  DDD', buttonId);
        //     // if (buttonId === 'sideDrawer_findPlace') {
        //     //     Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
        //     //         sideMenu: {
        //     //             left: {
        //     //                 visible: false
        //     //             },
        //     //         },
        //     //     });
        //     // }
        // });
    }


    componentDidMount() {
        // this.navigationEventListener = Navigation.events().bindComponent(this);

    }



    // navigationEventListener = (({ componentId, componentName, passProps }) => {
    //     console.log('dddd', componentId, componentName, passProps);
    // });

    // CommandListener = ((name, params) => {
    //     console.warn('how are you');

    // })




    // registerComponentDidAppearListener({ componentId, componentName, passProps }) {
    //     console.warn('sideMenu bbb', componentId, componentName, passProps);

    // }

    // navigationButtonPressed({ buttonId }) {
    //     console.warn('button');
    // }

    loginHandler = () => {
        //  initialiaze next screen
        // startMainTabs();
    }

    componentWillUnmount() {
        // Not mandatory
        // if (this.navigationEventListener) {
        //     this.navigationEventListener.remove();
        // }
    }
    render() {
        return (
            // <View> <Text>Auth Screenl</Text> </View>
            // <View style={styles.root}>
            //     <Text>Menu Screen</Text>
            // </View>
            <View style={[styles.container, { width: Dimensions.get('window').width * 0.8 }]}>
                <Text>Menu Screen</Text>
            </View>
        );
    }
}

MenuScreen.options = {
    // topBar: {
    //     title: {
    //         text: 'MENU_SCREEN',
    //         color: 'white',
    //     },
    //     background: {
    //         color: '#4d089a',
    //     },
    // },
    // bottomTab: {
    //     text: 'MENU_SCREEN',
    // },
    sideMenu: {
        left: {
            visible: false,
            enabled: false
        }
    }
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
    },
    container: {
        paddingTop: 22, backgroundColor: 'white',
        flex: 1,
    }
});

export default MenuScreen;
