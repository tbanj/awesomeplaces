/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
// import SettingScreen from './maintabs/Setting';
import startMainTabs from './maintabs/startMainTabs';
class AuthScreen extends Component {
    constructor(props) {

        super(props);
    }

    loginHandler = () => {
        //  initialiaze next screen
        // startMainTabs();
    }
    render() {
        return (
            // <View> <Text>Auth Screenl</Text> </View>
            <View style={styles.root}>
                <Text>Auth Screen</Text>
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

                <Button title="Login"
                    onPress={() => {
                        Navigation.setRoot(startMainTabs);
                    }} />
            </View>
        );
    }
}

AuthScreen.options = {
    topBar: {
        title: {
            text: 'AuthScreen',
            color: 'white',
        },
        background: {
            color: '#4d089a',
        },
    },
    bottomTab: {
        text: 'AuthScreen',
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

export default AuthScreen;