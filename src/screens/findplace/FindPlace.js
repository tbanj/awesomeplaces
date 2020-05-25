/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
class FindPlaceScreen extends Component {
    state = {}
    render() {
        return (
            <View>
                <Text>On Find Place Screen</Text>
            </View>
        );
    }
}


FindPlaceScreen.options = {
    topBar: {
        title: {
            text: 'Find Place',
            color: 'white',
        },
        background: {
            color: '#4d089a',
        },
    },
    bottomTab: {
        text: 'Find Place',
    },
};

export default FindPlaceScreen;
