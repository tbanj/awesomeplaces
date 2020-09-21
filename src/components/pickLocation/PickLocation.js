/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Alert, Button, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
class PickLocation extends Component {
    state = {
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
        },
        locationChosen: false,
    };
    handlePickLocation = (event) => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude,
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                },
                locationChosen: true,
            };
        });
    }

    getLocationHandler = () => {
        if (Platform.OS === 'ios') {
            // your code using Geolocation and asking for authorisation with
            console.log('you are here');
            Geolocation.requestAuthorization();
        }
        Geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    },
                },
            };
            this.handlePickLocation(coordsEvent);
        },
            err => {
                console.log(err);
                Alert.alert('Fetching Position faild, please pick one ma');
            });

    }
    render() {
        let marker = null;
        if (this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
        }
        return (
            <View style={styles.container}>

                {/* is use to animateRegion of map through making use of ref .. ref={refr => { this.map = refr; }} */}
                <MapView style={[styles.mapHeight, styles.bw]}
                    initialRegion={this.state.focusedLocation}
                    onPress={this.handlePickLocation}
                    ref={refr => { this.map = refr; }} >
                    {marker}
                </MapView>


                <View style={styles.button}>
                    <Button title={'Locate Me'} onPress={this.getLocationHandler} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { width: '100%' },
    button: { margin: 8 },
    mapHeight: { height: 250 },
    bw: { borderWidth: 1 },
    placeholder: {},
});

export default PickLocation;
