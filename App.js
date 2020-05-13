/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// eslint-disable-next-line prettier/prettier
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, StatusBar, Button, PickerIOSComponent } from 'react-native';
import { connect } from 'react-redux';

// import { Header, LearnMoreLinks, Colors } from 'react-native/Libraries/NewAppScreen';
import PlaceList from './src/components/placeList/PlaceList';
import PlaceDetail from './src/components/placedetail/PlaceDetail';
import PlaceImage from './src/assets/theater.jpeg';
import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index';

const App: () => React$Node = (props) => {
  const [placeName, setPlaceName] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setPlaceSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const placeNameChangeHandler = (event) => {
    setPlaceName(event);
  };

  const changeModalState = (data) => {
    setModalVisible(data);
  };

  const placeDeletedHandler = (data) => {
    // const newSate = [...places];
    // const removeText = newSate.filter((plac, ind) => plac.key !== data);
    // setPlaces(removeText);
    // setModalVisible(false);

    // const newSate = [...props.places];
    // const removeText = newSate.filter((plac, ind) => plac.key !== data);
    // setPlaces(removeText);
    // setModalVisible(false);
    props.onDeletePlace(data);
    setModalVisible(false);
  };


  const placeSelectedHandler = (data) => {
    // const newSate = [...places];
    // const removeText = newSate.filter((plac, ind) => plac.key !== data);
    // setPlaces(removeText);

    // setPlaceSelected(prevState => {
    //   return {
    //     selectedPlace: prevState.places.find(place => { return place.key === data; }),
    //   };
    // });

    // const newSate = [...places];
    // const selectedText = newSate.find((place, ind) => place.key === data);
    // // alert(`data ${data}  ${places[0].key} selectedText ${selectedText.name}`);
    // setPlaceSelected(selectedText);
    // setModalVisible(true);
    // alert(Object.keys(selectedPlace));
    // alert(` ${selectedPlace.name}`)

    props.onSelectedPlace(data);
    // alert(Object.keys(props.selectedPlace))
    setModalVisible(true);
  };

  /* Text node can't be styled as View node for Text Node to be well styled
  it has to be place in another component */
  // const placesOutput = places.map((place, index) => (
  //   <ListItem
  //     key={index}
  //     placeName={place}
  //     places={places}
  //     unit={index}
  //     onItemPressed={placeSelectedHandler}
  //   />
  // ));

  const placeSubmitHandler = () => {
    if (placeName.trim() === '') {
      return;
    }
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
    props.onAddPlace({ placeName: placeName, PlaceImage: PlaceImage });
    console.log(placeName, 'how are you');
    setPlaceName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputCss} placeholder="An awesome place" onChangeText={placeNameChangeHandler} value={placeName}
        />
        <Button style={styles.placeButton} title="Add" onPress={placeSubmitHandler} />
      </View>
      {/* Scrollview is not good for long list but it affect performance
      is good only for short list below 50
      FlatList is good for dynamic list, a list that can be upto 10,000 elements
      */}
      {/* <ScrollView style={styles.listContainer}>{placesOutput}</ScrollView> */}
      <View style={styles.listContainer}>
        {modalVisible === true && <PlaceDetail selectedPlace={props.selectedPlace} onItemDeleted={placeDeletedHandler}
          changeModalState={changeModalState} modalVisible={modalVisible} />}
        {props.places && props.places.length > 0 && < PlaceList places={props.places} onItemSelected={placeSelectedHandler} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 40,
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listContainer: {
    width: '100%',
    margin: 5,
  },
  inputCss: {
    width: '70%',
    // borderColor: 'black',
    // borderWidth: 1,
    // marginTop: 32,
  },
  inputContainer: {
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeButton: {
    width: '30%',
  },
});

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: (key) => dispatch(deletePlace(key)),
    onSelectedPlace: (key) => dispatch(selectPlace(key)),
    // onDeselectPlace: (name) => dispatch(addPlace(name)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
