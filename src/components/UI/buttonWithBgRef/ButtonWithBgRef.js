/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
const ButtonWithBgRef = React.forwardRef((props, ref) => (
    // <button ref={ref} className="FancyButton">
    //   {props.children}
    // </button>
    <TextInput underlineColorAndroid="transparent" {...props} returnKeyType="next"
        blurOnSubmit={false} onSubmitEditing={props.handleFocus} ref={ref}
        style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]} />
));
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

export default ButtonWithBgRef;
