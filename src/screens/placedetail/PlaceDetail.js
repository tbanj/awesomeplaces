/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// /* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text, Image,
    TouchableHighlight,
    View, Platform, Dimensions, ScrollView,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { deletePlace } from '../../store/actions/index';
// import Feather from 'react-native-vector-icons/Feather';

const PlaceDetail = (props) => {
    const dispatch = useDispatch();
    const [focusedLocation, setFocusedLocation] = useState({
        // 37.7900352, -122.4013726,
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
    });
    // delete with key assigned to it
    const deletePlaceHandler = (key, fileName) => {
        dispatch(deletePlace(key, fileName));
        // is use to return to previous component or route which takes us to this present component
        Navigation.pop(props.componentId);
    };

    useEffect(() => {
        if (props.selectedPlace !== undefined) {
            setFocusedLocation({
                ...props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
            });
        }
        return () => {
        }
    }, [props.selectedPlace]);
    return (
        <ScrollView keyboardShouldPersistTaps="always">
            <View style={styles.centeredView}>
                {props.selectedPlace !== undefined &&
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Image resizeMode="cover" source={props.selectedPlace.image} style={styles.imageSize} />

                            {focusedLocation.latitude !== null && <MapView style={[styles.mapHeight, styles.bw]}
                                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
                                initialRegion={focusedLocation}>
                                <MapView.Marker coordinate={focusedLocation} />
                            </MapView>}

                            <Text style={styles.modalText}>{props.selectedPlace.name} </Text>
                            <View>

                                <TouchableHighlight
                                    onPress={() => deletePlaceHandler(props.selectedPlace.key, props.selectedPlace.fileName)}
                                >
                                    <Text>
                                        <Icon name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={40} color="red" />;
          </Text>
                                </TouchableHighlight>

                            </View>
                        </View>
                    </View>
                }

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'flex-start',
        margin: 5,
    },
    modalView: {
        // margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 26,
    },
    imageSize: {
        width: '100%', height: 230, marginBottom: 10, flex: 1,
    },
    mapHeight: { width: '100%', height: 230 },
    bw: { borderWidth: 1 },
});

export default PlaceDetail;
