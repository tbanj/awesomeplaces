/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    View, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView, TouchableWithoutFeedback, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
// import SettingScreen from './maintabs/Setting';
import startMainTabs from './maintabs/startMainTabs';
import DefaultInput from '../components/UI/defaultInput/DefaultInput';
import DefaultInputRef from '../components/UI/defaultInputRef/DefaultInputRef';
import HeadingText from '../components/UI/headingText/HeadingText';
import MainText from '../components/UI/mainText/MainText';
import background from '../../src/assets/background.jpg';
import DefaultTouchable from '../components/UI/defaultTouch/DefaultTouchable';
import ButtonWithBg from '../components/UI/buttonWithBg/ButtonWithBg';
import validate from '../lib/validation';
import { tryAuth } from '../store/actions/auth';
import { Keyboard } from 'react-native';

// import DefaultButton from '../components/UI/defaultButton/DefaultButton';

class AuthScreen extends Component {
    state = {
        // respStyles: {
        //     pwdContainer: styles.portraitPwdContainer,
        //     pwdWrapper: styles.portraitPwdWrapper,
        // },
        authMode: 'login',
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        controls: {
            email: { value: '', touched: false, valid: false, validationRules: { isEmail: true } },
            password: { value: '', touched: false, valid: false, validationRules: { minLength: 6 } },
            confirmPassword: { value: '', touched: false, valid: false, validationRules: { equalTo: 'password' } },
        },

    };
    constructor(props) {

        super(props);
        Dimensions.addEventListener('change', (dims) => this.updateStyles());
        this.textInput = {};
    }

    focusNextTextInput = (id) => {
        this.textInput[id].focus();
    }

    loginHandler = () => {
        // const authData = {
        //     email: this.state.controls.email.value,
        //     password: this.state.controls.password.value,
        // };
        // this.props.onLogin(authData);
        Navigation.setRoot(startMainTabs);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login',
            };
        });
    }

    updateStyles = (dims) => {
        this.setState({
            viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        });
    }
    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue,
            };
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value,
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password' ? validate(prevState.controls.confirmPassword.value, prevState.controls.confirmPassword.validationRules, connectedValue) :
                            prevState.controls.confirmPassword.valid,
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true,
                    },

                },
            };
        });
    };

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles());
    }
    render() {
        let headingText = null;
        let confirmPasswordControl = null;
        if (Dimensions.get('window').height > 500) {
            headingText = (<MainText>
                <HeadingText style={styles.HeadingText}>Please Login</HeadingText>
            </MainText>);
        }
        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (<View style={this.state.viewMode === 'portrait' ? styles.portraitPwdWrapper : styles.landscapePwdWrapper}>
                <DefaultInputRef placeholder="Confirm Password"
                    onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                    value={this.state.controls.confirmPassword.value}
                    ref={ref => { this.textInput.confirmPass = ref }}
                    touched={this.state.controls.confirmPassword.touched}
                    valid={this.state.controls.confirmPassword.valid}
                    secureTextEntry
                    style={styles.input} />
            </View>);
        }
        return (
            <View style={styles.root}>
                <ImageBackground source={background} style={styles.background}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding">

                        {/* to make a style override the other it has to be the parent of that view or textciew */}
                        {headingText}
                        {/* <Button style={styles.buttonM} title="Switch to Login" /> */}
                        <ButtonWithBg color={'#29aaf4'} onPress={() => this.switchAuthModeHandler()} text={`Switch to ${this.state.authMode === 'login' ? 'Signup' : 'Login'}`} />
                        {/* <DefaultTouchable style={styles.loginScreenButton}
                            underlayColor="#fff" InnerText={'Switch to Login'} styleText={styles.loginText} /> */}
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.inputContainer}>
                                <DefaultInputRef
                                    onChangeText={(val) => this.updateInputState('email', val)}
                                    value={this.state.controls.email.value}
                                    valid={this.state.controls.email.valid}
                                    touched={this.state.controls.email.touched}
                                    ref={ref => { this.textInput.emailId = ref }}
                                    autoCapitalize="none"
                                    handleFocus={() => this.focusNextTextInput('userPass')}
                                    autoCorrect={false}
                                    keyboardType={'email-address'}

                                    placeholder="Email address" style={styles.input} />
                                <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login' ? styles.portraitPwdContainer : styles.landscapePwdContainer}>
                                    <View style={this.state.viewMode === 'portrait' || this.state.authMode === 'login' ? styles.portraitPwdWrapper : styles.landscapePwdWrapper}>
                                        {this.state.authMode === 'signup' ? <DefaultInputRef
                                            value={this.state.controls.password.value}
                                            onChangeText={(val) => this.updateInputState('password', val)}
                                            valid={this.state.controls.password.valid}
                                            touched={this.state.controls.password.touched}
                                            ref={ref => { this.textInput.userPass = ref }}
                                            handleFocus={() => this.focusNextTextInput('confirmPass')}
                                            placeholder="Password" style={styles.input}
                                            secureTextEntry /> : <DefaultInputRef
                                                value={this.state.controls.password.value}
                                                onChangeText={(val) => this.updateInputState('password', val)}
                                                valid={this.state.controls.password.valid}
                                                touched={this.state.controls.password.touched}
                                                ref={ref => { this.textInput.userPass = ref }}

                                                placeholder="Password" style={styles.input}
                                                secureTextEntry />}
                                    </View>
                                    {confirmPasswordControl}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        {/* <Button title="Submit"
                            onPress={() => {
                                Navigation.setRoot(startMainTabs);
                            }} /> */}
                        <ButtonWithBg style={styles.button} color={'#29aaf4'}
                            disabled={!this.state.controls.email.valid || !this.state.controls.confirmPassword.valid
                                && this.state.authMode === 'signup' || !this.state.controls.password.valid}
                            onPress={() => this.loginHandler()}
                            // hhhddd
                            // ref={ref => { this.textInput.submitBtn = ref }}
                            underlayColor="#fff" text={'Submit'} styleText={styles.loginText} />
                    </KeyboardAvoidingView>


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
    button: {
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
        color: 'black',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    landscapePwdContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    portraitPwdContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    landscapePwdWrapper: {
        width: '45%',
    },
    portraitPwdWrapper: {
        width: '100%',
    },

});

const mapDispatchToProps = dispatch => {
    return { onLogin: (authData) => dispatch(tryAuth(authData)) };
};
export default connect(null, mapDispatchToProps)(AuthScreen);

