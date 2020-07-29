/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadingText = (props) => (
    <Text {...props} style={[styles.textHeading, props.style]} > {props.children} </Text>);

const styles = StyleSheet.create({
    textHeading: {
        fontWeight: 'bold',
        fontSize: 28,
    },
});
export default HeadingText;
