/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
class DashboardScreen extends Component {
    state = {}
    render() {
        return (
            // <View> <Text>Auth Screenl</Text> </View>
            <View >
                <Text>Dashboard Screen</Text>
            </View>
        );
    }
}

DashboardScreen.options = {
    topBar: {
        title: {
            text: 'Dashboard',
            color: 'white',
        },
        background: {
            color: '#4d089a',
        },
    },
    bottomTab: {
        text: 'Dashboard',
    },
};

export default DashboardScreen;
