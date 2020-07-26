/* eslint-disable prettier/prettier */
import React, { Component, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Image } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/placeInput/PlaceInput';
import startMainTabs from '../maintabs/startMainTabs';
import DefaultInput from '../../components/UI/defaultInput/DefaultInput';
import TextHeading from '../../components/UI/headingText/HeadingText';
import ButtonWithBg from '../../components/UI/buttonWithBg/ButtonWithBg';
import DefaultTouchable from '../../components/UI/defaultTouch/DefaultTouchable';
import ImagePlaceholder from '../../../src/assets/home.png';
import MainText from '../../components/UI/mainText/MainText';

const SharePlaceScreen = (props) => {
    // want to listen to an event when navigator events occured
    // props.navigator.setOnNavigatorEvent(onNavigatorEvent);

    // const onNavigatorEvent = event => {
    //     console.warn('event', event);
    // };

    const dispatch = useDispatch();
    const placeAddedHandler = (data) => { dispatch(addPlace(data)); };
    let showSidebar = true;
    Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
        if (buttonId === 'sideDrawer') {
            if (showSidebar) {
                Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                    sideMenu: {
                        left: {
                            visible: true,
                        },
                    },
                });
                showSidebar = false;
            } else {
                Navigation.mergeOptions(startMainTabs.root.sideMenu.id, {
                    sideMenu: {
                        left: {
                            visible: false,
                        },
                    },
                });
                showSidebar = true;
            }


        }
    });

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <MainText>
                        <TextHeading >Share a Place with us!</TextHeading>
                    </MainText>
                </View>
                <View style={styles.placeholder}>
                    <Image source={ImagePlaceholder} style={styles.previewImage} />
                    {/* <Text>Preview Image</Text> */}
                </View>
                <DefaultTouchable style={[styles.loginScreenButton, styles.mb]}
                    underlayColor="#fff" InnerText={'Pick Image'} styleText={styles.loginText} />
                <View style={styles.placeholder}><Text>Map</Text></View>
                <DefaultTouchable style={styles.loginScreenButton}
                    underlayColor="#fff" InnerText={'Locate Me'} styleText={styles.loginText} />
                <PlaceInput onAddPlace={() => placeAddedHandler()} />
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    mb: { marginBottom: 10 },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        // alignItems: 'center',
        height: 150,
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    loginScreenButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#2196F3',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
    }
});
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
                id: 'sideDrawer',
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
