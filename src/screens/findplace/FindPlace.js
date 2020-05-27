/* eslint-disable prettier/prettier */
import React, { Component, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import PlaceList from '../../components/placeList/PlaceList';

const FindPlaceScreen = (props) => {

    // call state from redux store
    const { places } = useSelector(state => ({
        places: state.places.places,
    }));

    const itemSelectedHandler = (data) => {
        const selPlace = places.find(place => place.key === data);

        Navigation.push(props.componentId, {
            component: {
                name: 'awesome-places.Place Detail',
                title: selPlace.name,
                passProps: { selectedPlace: selPlace },
                options: {
                    topBar: {
                        title: {
                            text: selPlace.name,
                        },
                    },
                },
            },
        });

    };


    return (
        <View>
            <PlaceList places={places} onItemSelected={(data) => itemSelectedHandler(data)} />
        </View>
    );
};

export default FindPlaceScreen;
async function getMapIcon() {
    try {
        const source = await Icon.getImageSource('md-map', 30);
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
                icon: source,
            },
            // bottomTab: {
            //     animateBadge: true,
            //     text: 'Find Place',
            //     icon: source,
            //     dotIndicator: {
            //         animate: true,
            //         visible: true,
            //     },
            // },

        };
    } catch (error) {
        console.warn('error encounter');

    }
}
getMapIcon();