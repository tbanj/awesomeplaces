/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/placeInput/PlaceInput';

const SharePlaceScreen = (props) => {
    const dispatch = useDispatch();
    const placeAddedHandler = (data) => {

        dispatch(addPlace(data));
    };

    return (
        <View>
            {/* <Text>On Share Place Screen</Text> */}
            <PlaceInput onAddPlace={() => placeAddedHandler()} />
        </View>
    );
}

export default SharePlaceScreen;


// use if u want to make use of a single icon
// async function getMapIcon() {
//     const source = await Icon.getImageSource('md-map', 30);
// }

// is use to resolve promise which is more than one


Promise.all([
    Icon.getImageSource('md-share-alt', 30),
]).then(sources => {
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
            icon: sources[0],
        },

    };
});