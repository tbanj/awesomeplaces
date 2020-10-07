/* eslint-disable prettier/prettier */
import React from 'react';
import {
    TouchableHighlight, TouchableNativeFeedback, Text, View,
    Platform, StyleSheet, Keyboard,
} from 'react-native';
/*  for text components u cant set a border for it always refer to
https://github.com/vhpoet/react-native-styling-cheat-sheet */
const ButtonWithBg = (props) => {
    const content =
        <View style={[styles.button, {
            backgroundColor: props.color,

        },
        props.disabled ? [styles.disabled, { borderColor: props.borderClr, borderWidth: props.borderWd }] : null]}>
            <Text style={props.disabled ? styles.disabledText : null}>{props.text}</Text>
        </View>;
    if (props.disabled) { return content; }
    if (Platform.OS === 'android') {
        return (<TouchableNativeFeedback onPress={props.onPress}>
            {content}
        </TouchableNativeFeedback>);
    }
    return (
        <TouchableHighlight onPress={props.onPress} >
            {content}
        </TouchableHighlight>);

};
// onSubmitEditing={Keyboard.dismiss} blurOnSubmit={true}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
    },
    disabled: {
        backgroundColor: '#eee',
        borderColor: '#aaa',

    },
    disabledText: {
        color: '#aaa',
    },
});

export default ButtonWithBg;
