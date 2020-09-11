/* eslint-disable prettier/prettier */
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import PlaceList from '../../components/placeList/PlaceList';
import startMainTabs from '../maintabs/startMainTabs';


const FindPlaceScreen = (props) => {

    // call state from redux store
    const { places } = useSelector(state => ({
        places: state.places.places,
    }));

    // showSideBar is use to control when to close or open the sideBar
    let showSidebar;

    const sidebarEventListener = Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
        if (Platform.OS === 'android') {
            Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                sideMenu: {
                    left: {
                        visible: true,
                    },
                },
            });
            // showSidebar = false;
            return;
        }

        if (buttonId === 'sideDrawer_findPlace') {
            showSidebar = true;

            Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                sideMenu: {
                    left: {
                        visible: true,
                        // enabled: true,
                    },
                },
            });
            showSidebar = false;




        }
        else {

            Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                sideMenu: {
                    left: {
                        visible: false,
                        // enabled: false,
                    },
                },
            });
            showSidebar = true;

        }

        if (showSidebar) {
            Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                sideMenu: {
                    left: {
                        visible: true,
                    },
                },
            });
        } else {
            Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                sideMenu: {
                    left: {
                        visible: false,
                    },
                },
            });
        }
    });


    // unsubscribe sidebarEventListener
    sidebarEventListener.remove();



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
                icon: source[0],
                // iconColor: '#FF1493',
                // textColor: '#000',
                selectedIcon: source[0],
                selectedTextColor: '#FF1493',
                selectedIconColor: '#FF1493',
                fontFamily: 'Comfortaa-Regular',
            },
        };
    } catch (error) {
        console.warn('error encounter');

    }
}
Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30),
]).then(sources => {
    FindPlaceScreen.options = {
        topBar: {
            title: {
                text: 'Find Place',
                color: 'white',
            },
            background: {
                color: '#4d089a',
            },
            leftButtons: {
                id: 'sideDrawer_findPlace',
                icon: sources[1],
                color: 'white',
            },
        },
        bottomTab: {
            text: 'Find Place',
            icon: sources[0],
            // iconColor: '#FF1493',
            // textColor: '#000',
            selectedIcon: sources[0],
            selectedTextColor: '#FF1493',
            selectedIconColor: '#FF1493',
            fontFamily: 'Comfortaa-Regular',
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
});



