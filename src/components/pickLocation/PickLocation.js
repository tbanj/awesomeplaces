/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Alert, Button, Dimensions, Platform, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
class PickLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedLocation: {
                // 37.7900352, -122.4013726,
                //    6.4939597, 3.3529198,
                latitude: 37.7900352,
                longitude: -122.4013726,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
            },
            locationChosen: false,
        };

    }

    reset = () => {
        this.setState({
            focusedLocation: {
                // 37.7900352, -122.4013726,
                //    6.4939597, 3.3529198,
                latitude: 37.7900352,
                longitude: -122.4013726,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
            },
            locationChosen: false,
        });
    }
    handlePickLocation = (event) => {
        if (Platform.OS === 'ios') {
            // your code using Geolocation and asking for authorisation with
            Geolocation.requestAuthorization();
        }
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

        this.props.onLocationPick({ latitude: coords.latitude, longitude: coords.longitude });
    }

    getLocationHandler = () => {
        if (Platform.OS === 'ios') {
            // your code using Geolocation and asking for authorisation with
            Geolocation.requestAuthorization();
        }
        // watchPosition
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
                console.warn(err);
                Alert.alert('Kindly on your location, through setting, then try again');
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
                    provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : null}
                    initialRegion={this.state.focusedLocation}
                    region={!this.state.locationChosen ? this.state.focusedLocation : null}
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
});

export default PickLocation;
