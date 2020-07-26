/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Navigation } from 'react-native-navigation';
// import SettingScreen from './maintabs/Setting';
import startMainTabs from './maintabs/startMainTabs';
import DefaultInput from '../components/UI/defaultInput/DefaultInput';

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
            <View style={styles.root}>
                <View style={styles.container}>
                    <Text style={styles.textHeading}>Please Login</Text>
                    <Button title="Switch to Login" />
                    <View style={styles.inputContainer}>
                        <DefaultInput placeholder="Email address" style={styles.input} />
                        <DefaultInput placeholder="Password" style={styles.input} />
                        <DefaultInput placeholder="Confirm Password" style={styles.input} />
                    </View>
                    <Button title="Submit"
                        onPress={() => {
                            Navigation.setRoot(startMainTabs);
                        }} />
                </View>


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
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
    },
    container: {

        justifyContent: 'center',
        flex: 1,
        // width: '80%',
        alignItems: 'center',
        // paddingLeft: 10,
        // paddingRight: 10,
    },
    textHeading: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb',
    },
    inputContainer: {
        width: '80%',
    },
});

export default AuthScreen;
