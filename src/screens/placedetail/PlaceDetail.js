/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// /* eslint-disable no-unused-vars */

import React from 'react';
import {
    StyleSheet,
    Text, Image,
    TouchableHighlight,
    View, Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { deletePlace } from '../../store/actions/index';
// import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
const PlaceDetail = (props) => {

    const dispatch = useDispatch();
    // delete with key assigned to it
    const deletePlaceHandler = (key) => {
        dispatch(deletePlace(key));
        // is use to return to previous component or route which takes us to this present component
        Navigation.pop(props.componentId);
    };

    return (
        <View style={styles.centeredView}>

            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Image resizeMode="contain" source={props.selectedPlace.image} />
                    <Text style={styles.modalText}>{props.selectedPlace.name} </Text>
                    <View>
                        {/* <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: 'red', marginTop: 10, marginBottom: 10 }}
                            onPress={() => deletePlaceHandler(props.selectedPlace.key)}
                        >
                            <Text style={styles.textStyle}>Delete</Text>
                        </TouchableHighlight> */}

                        <TouchableHighlight
                            onPress={() => deletePlaceHandler(props.selectedPlace.key)}
                        >
                            <Text>
                                <Icon name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={40} color="red" />;
          </Text>
                        </TouchableHighlight>

                        {/* <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                            onPress={() => props.changeModalState(!props.modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </TouchableHighlight> */}
                        {/* <View>
                            <Feather name="activity" style={{ fontSize: 50 }} />
                        </View> */}
                    </View>
                </View>
            </View>
        </View>
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
    },
});

export default PlaceDetail;
