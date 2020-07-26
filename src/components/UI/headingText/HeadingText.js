/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TextHeading = (props) => (
    <Text> {...props} style ={[styles.TextHeading, props.style]} </Text>);

const styles = StyleSheet.create({
    textHeading: {
        fontWeight: 'bold',
        fontSize: 28,
    },
});
export default TextHeading;