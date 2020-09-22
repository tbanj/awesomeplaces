/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import PlaceImage from '../../../src/assets/theater.jpeg';
import DefaultTouchable from '../UI/defaultTouch/DefaultTouchable';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {
    state = {
        imagePicker: null,
    };

    handleImagePicked = () => {
        ImagePicker.showImagePicker({
            title: 'Pick an Image',
        }, res => {
            // check if user cancel the camera intent without taking pictures
            if (res.didCancel) {
                console.log('User cancelled!');
            } else if (res.error) { console.log('Error', res.error); }
            else {
                this.setState({ imagePicker: { uri: res.uri } });
                this.props.onImagePicker({ uri: res.uri });
            }
        });

        // this.setState({
        //     imagePicker: PlaceImage,
        // });
    };
    render() {
        return (<View style={styles.container}>
            <View style={[styles.placeholder, styles.mb]}>
                {this.state.imagePicker !== null && <Image resizeMode="contain" source={this.state.imagePicker} style={styles.previewImage} />}

            </View>
            <DefaultTouchable style={[styles.loginScreenButton, styles.mb]}
                underlayColor="#fff" InnerText={'Pick Image'} styleText={styles.loginText} onPress={this.handleImagePicked} />
        </View>);
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    mb: { marginBottom: 10 },
    placeholder: {
        borderColor: 'black',
        borderWidth: 1,
        // backgroundColor: '#eee',
        width: '80%',
        height: 150,
        // alignItems: 'center',

    },
    previewImage: {
        // width: '100%',
        // height: '100%',
        flex: 1,
        resizeMode: 'stretch',
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
});

export default PickImage;
