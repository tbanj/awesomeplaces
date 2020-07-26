/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    View, Text, Button, StyleSheet, TextInput, ImageBackground,
    TouchableOpacity
} from 'react-native';
import { Navigation } from 'react-native-navigation';
// import SettingScreen from './maintabs/Setting';
import startMainTabs from './maintabs/startMainTabs';
import DefaultInput from '../components/UI/defaultInput/DefaultInput';
import HeadingText from '../components/UI/headingText/HeadingText';
import MainText from '../components/UI/mainText/MainText';
import background from '../../src/assets/background.jpg';
// import DefaultButton from '../components/UI/defaultButton/DefaultButton';

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
                <ImageBackground source={background} style={styles.background}>
                    <View style={styles.container}>

                        {/* to make a style override the other it has to be the parent of that view or textciew */}
                        <MainText>
                            <HeadingText style={styles.HeadingText}>Please Login</HeadingText>
                        </MainText>
                        {/* <Button style={styles.buttonM} title="Switch to Login" /> */}
                        <TouchableOpacity
                            style={styles.loginScreenButton}
                            underlayColor="#fff">
                            <Text style={styles.loginText}>Switch to Login</Text>
                        </TouchableOpacity>
                        <View style={styles.inputContainer}>
                            <DefaultInput placeholder="Email address" style={styles.input} />
                            <DefaultInput placeholder="Password" style={styles.input} />
                            <DefaultInput placeholder="Confirm Password" style={styles.input} />
                        </View>
                        {/* <Button title="Submit"
                            onPress={() => {
                                Navigation.setRoot(startMainTabs);
                            }} /> */}
                        <TouchableOpacity onPress={() => {
                            Navigation.setRoot(startMainTabs);
                        }}
                            style={styles.loginScreenButton}
                            underlayColor="#fff">
                            <Text style={styles.loginText}>Submit</Text>
                        </TouchableOpacity>
                    </View>


                </ImageBackground>
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
    background: {
        width: '100%',
        flex: 1,
    },
    buttonM: {
        // padding: 15,
        // backgroundColor: 'white',
        // borderColor: 'red',
        // color: 'white',
    },
    loginScreenButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#2196F3',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    loginText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
});

export default AuthScreen;
