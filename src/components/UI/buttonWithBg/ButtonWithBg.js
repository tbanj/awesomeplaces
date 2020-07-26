/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';
/*  for text components u cant set a border for it always refer to
https://github.com/vhpoet/react-native-styling-cheat-sheet */
const ButtonWithBg = (props) => (
    <TouchableHighlight onPress={props.onPress} style={[styles.button, { backgroundColor: props.color }]}>
        <Text>{props.text}</Text>
    </TouchableHighlight>);

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
    },
});

export default ButtonWithBg;
