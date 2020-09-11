/* eslint-disable prettier/prettier */
import React from 'react';
import {
    TouchableHighlight, TouchableNativeFeedback, Text, View,
    Platform, StyleSheet,
} from 'react-native';
/*  for text components u cant set a border for it always refer to
https://github.com/vhpoet/react-native-styling-cheat-sheet */
const ButtonWithBg = (props) => {
    const content =
        <View style={[styles.button, { backgroundColor: props.color }]}>
            <Text>{props.text}</Text>
        </View>;

    if (Platform.OS === 'android') {
        return (<TouchableNativeFeedback>
            {content}
        </TouchableNativeFeedback>);
    }
    return (
        <TouchableHighlight onPress={props.onPress} >
            {content}
        </TouchableHighlight>);

};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
    },
});

export default ButtonWithBg;
