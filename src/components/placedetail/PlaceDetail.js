/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// /* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text, Image,
    TouchableHighlight,
    View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const PlaceDetail = (props) => {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {props.selectedPlace && props.selectedPlace.name && <Text style={styles.modalText}>{props.selectedPlace.name} </Text>}
                        {props.selectedPlace && props.selectedPlace.image && <Image resizeMode="contain" source={props.selectedPlace.image} />}
                        <View>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: 'red', marginTop: 10, marginBottom: 10 }}
                                onPress={() => props.onItemDeleted(props.selectedPlace.key)}
                            >
                                <Text style={styles.textStyle}>Delete</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                                onPress={() => props.changeModalState(!props.modalVisible)}
                            >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </TouchableHighlight>
                            <View>
                            {/* <Text>
                            <Icon name="ios-basket" size={30} color="#900" />;
          </Text> */}
                            <Feather name="activity" style={{fontSize: 50}} />
                            </View>
                     
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
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
        backgroundColor: '#F194FF',
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
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default PlaceDetail;
