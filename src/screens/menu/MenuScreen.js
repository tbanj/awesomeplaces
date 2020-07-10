/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
// import SettingScreen from './maintabs/Setting';
class MenuScreen extends Component {
    constructor(props) {

        super(props);
        // this.navigationEventListener = Navigation.events().bindComponent(this);
        Navigation.events().bindComponent(this);
        // const navigationButtonEventListener = Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {

        // });
    }


    componentDidMount() {

    }
    // CommandListener = ((name, params) => {
    //     console.warn('how are you');

    // })




    // navigationButtonPressed({ buttonId }) {
    //     console.warn('sideMenu bbb', buttonId);
    //     if (buttonId === 'sideMenu') {
    //         console.log('sideMenu', buttonId);
    //         console.warn('sideMenu', buttonId);

    //         Navigation.mergeOptions(this, {
    //             sideMenu: {
    //                 left: {
    //                     visible: true
    //                 },
    //             },
    //         });
    //     }
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
            <View style={styles.root}>
                <Text>Menu Screen</Text>
                {/* <Text>How are you</Text> */}
                {/* <Button title="Login" onPress={this.loginHandler} /> */}
                {/* <Button title="Login"
                    onPress={() => Navigation.push(this.props.componentId, {
                        component: {
                            name: 'SettingScreen',
                            options: {
                                topBar: {
                                    title: {
                                        text: 'SettingScreen',
                                    },
                                },
                            },
                        },
                    })} /> */}


            </View>
        );
    }
}

MenuScreen.options = {
    topBar: {
        title: {
            text: 'MENU_SCREEN',
            color: 'white',
        },
        background: {
            color: '#4d089a',
        },
    },
    bottomTab: {
        text: 'MENU_SCREEN',
    },
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
    },
});

export default MenuScreen;
