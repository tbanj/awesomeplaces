/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PlaceImage from '../../../src/assets/theater.jpeg';
import { addPlace } from '../../../src/store/actions/index';
import DefaultTouchable from '../UI/defaultTouch/DefaultTouchable';
import ImagePicker from 'react-native-image-picker';
import { createStorageReferenceToFile, getUrl, uploadFileToFireBase } from '../../lib/storage';

class PickImage extends Component {
    state = {
        imagePicker: null,
    };
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        // this.initiateAuth();
    }
    componentWillUnmount() {
        // console.log('i destroy the auth state');
    }

    handleImagePicked = () => {
        /*  incase you dont want to store the data from Gallery or camera 
        which is needed to be in base64 string include
       parameter {noData: true} which will help for better performance  */
        ImagePicker.showImagePicker({
            title: 'Pick an Image',
        }, async (res) => {
            // check if user cancel the camera intent without taking pictures
            if (res.didCancel) {
                Alert.alert('User cancelled!');
            }
            else if (res.error) { console.warn('Error', res.error); }
            else if (res.customButton) {
                Alert.alert(res.customButton);
            }
            else {

                this.setState({ imagePicker: { uri: res.uri } });
                // res.data the image is stored in form of strings

                // console.log(
                //     'My file storage reference is: ',
                //     createStorageReferenceToFile(res)
                // );
                // Add this

                this.props.onImagePicker({ uri: res.uri, base64: res.data, totalData: res });



            }
        });

        // this.setState({
        //     imagePicker: PlaceImage,
        // });
    };
    render() {
        return (<View style={styles.container}>
            <View style={[styles.placeholder, styles.mb]}>
                {this.state.imagePicker !== null && <Image resizeMode="cover" source={this.state.imagePicker} style={styles.previewImage} />}

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
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        // backgroundColor: '#eee',
        width: '80%',
        height: 150,
        // alignItems: 'center',

    },
    previewImage: {
        width: '100%',
        height: '100%',
        flex: 1,
        // resizeMode: 'stretch',
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

const mapStateToProps = (state) => {
    return {
        places: state.places.places,
        selectedPlace: state.places.selectedPlace,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAddPlace: (name, location, image) => dispatch(addPlace(name, location, image)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickImage);
