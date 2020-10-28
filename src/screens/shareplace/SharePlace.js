/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
    View, ScrollView, StyleSheet,
    Platform, KeyboardAvoidingView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useDispatch } from 'react-redux';
// import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/placeInput/PlaceInput';
import startMainTabs from '../maintabs/startMainTabs';
// import DefaultInput from '../../components/UI/defaultInput/DefaultInput';
import TextHeading from '../../components/UI/headingText/HeadingText';
// import ButtonWithBg from '../../components/UI/buttonWithBg/ButtonWithBg';
// import DefaultTouchable from '../../components/UI/defaultTouch/DefaultTouchable';
// import ImagePlaceholder from '../../../assets/home.png';
import MainText from '../../components/UI/mainText/MainText';


const SharePlaceScreen = (props) => {
    // const [imagePicker, setImagePicker] = useState(null);
    const [menuBtn, setMenuBtn] = useState(true);
    // want to listen to an event when navigator events occured
    // props.navigator.setOnNavigatorEvent(onNavigatorEvent);

    // const onNavigatorEvent = event => {
    //     console.warn('event', event);
    // };

    const dispatch = useDispatch();


    const placeAddedHandler = (data) => {
        dispatch(addPlace(data));
    };


    // const submitButton = ''
    useEffect(() => {
        // Subscribe
        // auth().signInAnonymously();
        const screenEventListener = Navigation.events().registerComponentDidDisappearListener(({ componentId, componentName }) => {


            if (componentName === 'awesome-places.MenuScreen') {
                setMenuBtn(true);
            }
        });
        // // Unsubscribe

        const sidebarSharePlaceListener = Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
            if (buttonId === 'sideDrawer_sharePlace') {
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
                            visible: menuBtn === true ? true : false,
                            enabled: true,
                        },
                    },
                });

                function toggleMenuBtn() {
                    setMenuBtn(menuBtn === false ? true : false);
                }
                toggleMenuBtn();
            }
        });


        // unsubscribe sidebarSharePlaceListener
        return () => {
            sidebarSharePlaceListener.remove();
            screenEventListener.remove();
        };
    }, [menuBtn]);


    // const handleImagePicked = () => {
    //     if (places.length < 1) { return; }
    //     setImagePicker(places[places.length - 1].image);
    // };

    return (


        <ScrollView keyboardShouldPersistTaps="always">
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.header}>
                    <MainText>
                        <TextHeading >Share a Place with us!</TextHeading>
                    </MainText>
                </View>
                {/* <View style={[styles.placeholder, styles.imgHeight, styles.mb]}>
                    {places.length > 0 && <Image resizeMode="contain" source={imagePicker} style={styles.previewImage} />}

                </View>
                <DefaultTouchable style={[styles.loginScreenButton, styles.mb]}
                    underlayColor="#fff" InnerText={'Pick Image'} styleText={styles.loginText} onPress={() => handleImagePicked()} /> */}
                <View style={[styles.placeholder]}>
                    {/* <Text>Map</Text> */}

                </View>

                {/* <DefaultTouchable style={styles.loginScreenButton}
                    underlayColor="#fff" InnerText={'Locate Me'} styleText={styles.loginText} /> */}

                <PlaceInput onAddPlace={() => placeAddedHandler()} />
            </KeyboardAvoidingView>
        </ScrollView>





    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    testDiv: { flex: 1 },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    mb: { marginBottom: 10 },
    placeholder: {
        borderColor: 'black',
        // backgroundColor: '#eee',
        width: '80%',
        // alignItems: 'center',

    },
    imgHeight: { height: 150 },

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
    },
    placeImage: { marginRight: 8, height: 30, width: 30 },
});
export default SharePlaceScreen;


// use if u want to make use of a single icon
// async function getMapIcon() {
//     const source = await Icon.getImageSource('md-map', 30);
// }

// is use to resolve promise which is more than one


Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30),
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
