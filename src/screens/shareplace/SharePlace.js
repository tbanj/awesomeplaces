/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
class SharePlaceScreen extends Component {
    state = {}
    render() {
        return (
            <View>
                <Text>On Share Place Screen</Text>
            </View>
        );
    }
}

SharePlaceScreen.options = {
    topBar: {
        title: {
            text: 'Share Place',
            color: 'white',
        },
        background: {
            color: '#4d089a',
        },
    },
    bottomTab: {
        text: 'Share Place',
    },
};

export default SharePlaceScreen;