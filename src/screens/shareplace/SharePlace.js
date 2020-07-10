/* eslint-disable prettier/prettier */
import React, { Component, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/placeInput/PlaceInput';
import startMainTabs from '../maintabs/startMainTabs';

const SharePlaceScreen = (props) => {
    // want to listen to an event when navigator events occured
    // props.navigator.setOnNavigatorEvent(onNavigatorEvent);

    // const onNavigatorEvent = event => {
    //     console.warn('event', event);
    // };

    const dispatch = useDispatch();
    const placeAddedHandler = (data) => { dispatch(addPlace(data)); };


    useEffect(() => {
        const bottomTabEventListene = Navigation.events().registerBottomTabSelectedListener(({ selectedTabIndex, unselectedTabIndex }) => {

            if (selectedTabIndex === 1) {
                console.log('share place', selectedTabIndex, unselectedTabIndex);
                Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
                    console.warn('sharePlace buttonId', buttonId);
                    if (buttonId === 'sideDrawer_sharePlace') {
                        console.warn('sharePlace buttonId', buttonId);
                        Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                            sideMenu: {
                                left: {
                                    visible: true
                                },
                            },
                        });
                    }
                });
            }
        });
        return () => {
            bottomTabEventListene.remove();

        };
    }, []);


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
    Icon.getImageSource('ios-menu', 30),
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
            /* to make button open a sideMenu Screen, we need to listen to Navigation
            events */
            leftButtons: {
                id: 'sideDrawer_sharePlace',
                icon: sources[1],
                color: 'white',
            },
        },
        // bottomTab: {
        //     text: 'Share Place',
        //     icon: sources[0],
        // },
        bottomTab: {
            text: 'Share Place',
            icon: sources[0],
            // iconColor: '#FF1493',
            // textColor: '#000',
            selectedIcon: sources[0],
            selectedTextColor: '#FF1493',
            selectedIconColor: '#FF1493',
            fontFamily: 'Comfortaa-Regular',
        },
        // bottomTabs: {
        //     animate: true,
        // },
    };
}).catch(error => {
    console.error(error.message);
});
