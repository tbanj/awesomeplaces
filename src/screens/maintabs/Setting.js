/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
class SettingScreen extends Component {
    state = {}
    render() {
        return (
            // <View> <Text>Auth Screenl</Text> </View>
            <View style={styles.root}>
                <Text>Settings Screen</Text>
            </View>
        );
    }
}

SettingScreen.options = {
    topBar: {
        title: {
            text: 'Settings',
            color: 'blue',
        },
    },
    bottomTab: {
        text: 'Settings',
    },
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'whitesmoke',
    },
});

export default SettingScreen;
