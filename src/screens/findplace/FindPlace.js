/* eslint-disable prettier/prettier */
import React, { Component, useState, useEffect } from 'react';
import { View, Text, Platform, TouchableOpacity, StyleSheet, Animated } from 'react-native';
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
    const [placesLoaded, setPlacesLoaded] = useState(false);

    const [removeAnim, setRemoveAnim] = useState(new Animated.Value(1));
    const [placesAnim, setPlacesAnim] = useState(new Animated.Value(0));

    // showSideBar is use to control when to close or open the sideBar







    useEffect(() => {
        let showSidebar = true;
        const sidebarEventListener = Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {

            if (buttonId === 'sideDrawer_findPlace') {
                if (Platform.OS === 'android') {
                    Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                        sideMenu: {
                            left: {
                                visible: true,
                                enabled: true,
                            },
                        },
                    });
                    return;
                }
                Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                    sideMenu: {
                        left: {
                            visible: showSidebar === true ? true : false,
                            enabled: true,
                        },
                    },
                });

                function toggleMenuBtn() {
                    showSidebar = !showSidebar;
                }
                toggleMenuBtn();
            }

            // if (Platform.OS === 'android') {
            //     Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
            //         sideMenu: {
            //             left: {
            //                 visible: true,
            //                 enabled: true,
            //             },
            //         },
            //     });
            //     // showSidebar = false;
            //     return;
            // }

            // if (buttonId === 'sideDrawer_findPlace') {
            //     showSidebar = true;

            //     Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
            //         sideMenu: {
            //             left: {
            //                 visible: true,
            //                 // enabled: true,
            //             },
            //         },
            //     });
            //     showSidebar = false;




            // }
            // else {

            //     Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
            //         sideMenu: {
            //             left: {
            //                 visible: false,
            //                 // enabled: true,
            //             },
            //         },
            //     });
            //     showSidebar = true;

            // }

            // if (showSidebar) {
            //     Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
            //         sideMenu: {
            //             left: {
            //                 visible: true,
            //                 enabled: true,
            //             },
            //         },
            //     });
            // } else {
            //     Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
            //         sideMenu: {
            //             left: {
            //                 visible: false,
            //                   enabled: true,
            //             },
            //         },
            //     });
            // }
        });


        return () => {
            // unsubscribe sidebarEventListener
            sidebarEventListener.remove();
        }
    }, []);

    const placesLoadedHandler = () => {
        Animated.timing(placesAnim, {
            toValue: 1, duration: 500, useNativeDriver: true,
        }).start();
    };

    const placesSearchHandler = () => {
        Animated.timing(removeAnim,
            { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
                setPlacesLoaded(true);
                placesLoadedHandler();
            });



    };

    // scale: removeAnim
    let content = (<Animated.View style={{
        opacity: removeAnim,
        transform: [{
            scale: removeAnim.interpolate(
                {
                    inputRange: [0, 1],
                    outputRange: [12, 1],
                })
        }],
    }}>
        <TouchableOpacity onPress={() => placesSearchHandler()}>
            <View style={styles.searchButton}><Text style={styles.searchButtonText}>Find Places</Text></View>
        </TouchableOpacity  >
    </Animated.View>);

    if (placesLoaded) {
        content = (<Animated.View style={{
            opacity: placesAnim,
            // transform: [{
            //     scale: placesAnim.interpolate(
            //         {
            //             inputRange: [0, 1],
            //             outputRange: [1, 1],
            //         }),
            // }],
        }}>
            <PlaceList places={places} onItemSelected={(data) => itemSelectedHandler(data)} />
        </Animated.View>);
    }

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
        <View style={placesLoaded ? null : styles.buttonContainer}>
            {content}
            {/* {!placesLoaded && content}
            {placesLoaded && <PlaceList places={places} onItemSelected={(data) => itemSelectedHandler(data)} />} */}
        </View>
    );
};

const styles = StyleSheet.create({
    searchButton: {
        borderColor: '#FF1493',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20,
    },
    searchButtonText: {
        color: '#FF1493',
        fontWeight: 'bold',
        fontSize: 26,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

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



