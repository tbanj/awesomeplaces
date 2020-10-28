/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {
    StyleSheet, View, TouchableWithoutFeedback, Keyboard,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { addPlace, deletePlace, selectPlace } from '../../../src/store/actions/index';
import validate from '../../lib/validation';
import PlaceImage from '../../../assets/theater.jpeg';
import PickImage from '../../../src/components/pickImage/PickImage';
import ButtonWithBg from '../UI/buttonWithBg/ButtonWithBg';
import DefaultInput from '../UI/defaultInput/DefaultInput';
import PickLocation from '../pickLocation/PickLocation';
class PlaceInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            controls: {
                placeName: { value: '', touched: false, valid: false, validationRules: { minLength: 3 } },
                location: { value: null, valid: false },
                imagePicker: null,
                image: {
                    value: null,
                    valid: false,
                },
            },
        };
        // this._onLogin = this._onLogin.bind(this);
    }



    placeNameChangeHandler = (key, val) => {

        this.setState((prevState) => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val, valid: validate(val, prevState.controls[key].validationRules),
                        touched: true,
                    },
                },
            };
        });
    };
    locationPickHandler = (locate) => {
        this.setState((prevState) => {
            return {
                controls: {
                    ...prevState.controls,
                    location: { value: locate, valid: true },
                },
            };
        });
    };

    handleImagePicked = () => {
        if (this.state.controls.placeName.valid) {
            return;
        }
        // setImagePicker(places[places.length - 1].image);
        this.setState((prevState) => {
            return {
                controls: {
                    ...prevState.controls,
                    imagePicker: PlaceImage,
                },
            };
        });
    };

    placeSubmitHandler = async () => {
        try {
            if (this.state.controls.placeName.value.trim() === '') { return; }
            //  in react-native to view debug make use of alert to display content u want to troubleshoot
            // setPlaces([
            //   ...places,
            //   {
            //     key: new Date().getTime() + '', name: placeName,
            //     image: PlaceImage, remoteImage: {
            //       uri: 'http://4.bp.blogspot.com/-TLR8ISV2qWo/TyUeVqg9xmI/AAAAAAAACOU/1rCZw9-uj50/s640/62589635.jpg',
            //       width: 30, height: 30,
            //     },
            //   },
            // ]);
            await this.props.onAddPlace({ ...this.props.places, placeName: this.state.controls.placeName.value, PlaceImage: PlaceImage },
                this.state.controls.location.value, this.state.controls.image.value);

            this.setState((prevState) => {
                return {
                    controls: {
                        ...prevState.controls,
                        placeName: { value: '', valid: false },
                        location: { value: '', valid: false },
                        image: { value: null, valid: false },
                    },
                };
            });
            this.pickImage.reset();
            this.pickLocation.reset();
            // { controls: { placeName: { value: '', valid: false } } }
            Keyboard.dismiss();
        } catch (error) {

        }
    };

    imagePickHandler = (img) => {
        this.setState((prevState) => {
            return {
                controls: {
                    ...prevState.controls,
                    image: { value: img, valid: true },
                },
            };
        });
    }

    render() {
        let submitButton = <ButtonWithBg style={styles.loginScreenButton} color={'#29aaf4'}
            borderClr={'#0000FF'} borderWd={1}
            disabled={!this.state.controls.placeName.valid || !this.state.controls.location.valid ||
                !this.state.controls.image.valid}
            onPress={() => { this.placeSubmitHandler(); }}
            underlayColor="#fff" text={'Share a Place'} styleText={styles.loginText} />;
        if (this.props.isLoading) {
            submitButton = <View style={styles.pt10}><ActivityIndicator color="#2196F3" /></View>;
        }

        // const handleImageComponent = forwardRef(({ theme, ...rest }, ref) => (
        //     <PickImage onImagePicker={this.imagePickHandler}
        //         ref={refs => { this.imagePickHandle = refs; }} />

        // ));
        // const checkObj = Object.keys(handleImageComponent);
        // console.log('checkObj, $$typeof', handleImageComponent.$$typeof);
        return (
            <View style={styles.container}>
                <PickImage onImagePicker={this.imagePickHandler} imagePickerRef={ref => { this.pickImage = ref; }}
                />
                {/* {this.handleImageComponent} */}
                {/* <View>{handleImageComponent}</View> */}
                {/* {<View>{handleImageComponent.$$typeof}</View>} */}
                {/* <View style={[styles.placeholder, styles.imgHeight, styles.mb]}>
                    {this.state.controls.placeName.valid && <Image resizeMode="contain" source={this.state.controls.imagePicker} style={styles.previewImage} />}

                </View>
                <DefaultTouchable style={[styles.loginScreenButton, styles.mb]}
                    underlayColor="#fff" InnerText={'Pick Image'} styleText={styles.loginText} onPress={this.handleImagePicked} /> */}

                <PickLocation onLocationPick={this.locationPickHandler} ref={ref => { this.pickLocation = ref; }} />
                <View style={styles.inputContainer} >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <DefaultInput style={styles.bd} placeholder="An awesome place" onChangeText={(event) => this.placeNameChangeHandler('placeName', event)}
                            value={this.state.controls.placeName.value}
                            handleReturnType={'done'}
                            onKeyDismiss={this.state.controls.placeName.valid || this.state.controls.location.valid ||
                                this.state.controls.image.valid ?
                                () => { this.placeSubmitHandler(); } : Keyboard.dismiss}
                            handleBlur={true}
                            touched={this.state.controls.placeName.touched}
                            valid={this.state.controls.placeName.valid}
                        />

                    </TouchableWithoutFeedback>
                    {/* <DefaultTouchable style={styles.loginScreenButton} onPress={() => { this.placeSubmitHandler(); }}
                        underlayColor="#fff" InnerText={'Share a Place'} styleText={styles.loginText} /> */}

                    {/* || !this.state.controls.location.valid */}
                    {submitButton}
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: { width: '80%' },
    inputCss: {
        width: '80%',
    },
    bd: {
        borderColor: 'black',
        borderWidth: 1,
    },
    inputContainer: {
        width: '100%',

        // flex: 1,
        // padding: 10,
        // width: '100%',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
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
    imgHeight: { height: 150 },
    mb: { marginBottom: 10 },
    pt10: { paddingTop: 10 },
    // placeButton: {
    //     borderColor: 'red',
    //     borderWidth: 1,
    // },

});
const mapStateToProps = state => {
    return {
        places: state.places.places,
        selectedPlace: state.places.selectedPlace,
        isLoading: state.ui.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (name, location, image) => dispatch(addPlace(name, location, image)),
        onDeletePlace: (key, fileName) => dispatch(deletePlace(key, fileName)),
        onSelectedPlace: (key) => dispatch(selectPlace(key)),
        onDeselectPlace: (name) => dispatch(addPlace(name)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceInput);
