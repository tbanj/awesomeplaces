/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, StyleSheet } from 'react-native';
const DefaultButton = (props) => (
    <Button {...props} style={[styles.buttonT, props.style]} />
);

const styles = StyleSheet.create({
    buttonT: {
        padding: 5,
        color: 'white',
    },
});

export default DefaultButton;