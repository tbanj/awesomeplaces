// /* eslint-disable prettier/prettier */
// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { connect } from 'react-redux';
// // import PlaceList from '../../components/placeList/PlaceList';
// class FindPlaceScreen extends Component {
//     state = {}
//     componentDidMount() {
//         this.getMapIcon;
//     }

//     getMapIcon = async () => {
//         try {
//             const source = await Icon.getImageSource('md-map', 30);
//             FindPlaceScreen.options = {
//                 topBar: {
//                     title: {
//                         text: 'Find Place',
//                         color: 'white',
//                     },
//                     background: {
//                         color: '#4d089a',
//                     },
//                 },
//                 bottomTab: {
//                     text: 'Find Place',
//                     icon: source,

//                 },
//                 // bottomTab: {
//                 //     animateBadge: true,
//                 //     text: 'Find Place',
//                 //     icon: source,
//                 //     dotIndicator: {
//                 //         animate: true,
//                 //         visible: true,
//                 //     },
//                 // },
//             };
//         } catch (error) {

//         }
//     }
//     render() {
//         return (
//             <View>
//                 <Text>On Find Place Screen</Text>
//                 {/* <PlaceList places={this.props.places} /> */}
//             </View>
//         );
//     }
// }

// // const mapStateToProps = (state) => {
// //     return {
// //         places: state.places.places,
// //     };
// // };
// // export default connect(mapStateToProps)(FindPlaceScreen);
// export default FindPlaceScreen;
