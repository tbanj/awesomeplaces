/* eslint-disable prettier/prettier */
const React = require('react');
const Navigation = require('react-native-navigation');
const { View, Text } = require('react-native');
// import Icon from 'react-native-vector-icons/Ionicons';
// import PlaceImage from '../../assets/theater.jpeg';


class SideDrawer extends React.Component {

    // async getMapIcon() {
    //     try {
    //         const source = await Icon.getImageSource('md-map', 30);
    //         console.warn('source', source);

    //     } catch (error) {
    //         console.warn('error encounter');
    //     }
    // }
    // getMapIcon()

    static options() {
        return {
            topBar: {
                leftButtons: {
                    id: 'sideMenu',
                    icon: require('../../assets/theater.jpeg'),
                },
            },
        };
    }


    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        return (
            <View>
                <Text>Click the hamburger icon to open the side menu</Text>

                <Text>Click the hamburger icon to open the side menu</Text>
                <Text>Click the hamburger icon to open the side menu</Text>
            </View>
        );
    }

    // navigationButtonPressed({ buttonId }) {
    //     if (buttonId === 'sideMenu') {
    //         Navigation.mergeOptions(this, {
    //             sideMenu: {
    //                 left: {
    //                     visible: true,
    //                 },
    //             },
    //         });
    //     }
    // }
}
SideDrawer.options = {
    topBar: {
        title: {
            text: 'AuthScreen',
            color: 'white',
        },
        background: {
            color: '#4d089a',
        },
    },
    bottomTab: {
        text: 'AuthScreen',
    },
};

// const styles = StyleSheet.create({
//     root: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'whitesmoke',
//     },
// });
export default SideDrawer;

