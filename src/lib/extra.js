/* eslint-disable prettier/prettier */
import Icon from 'react-native-vector-icons/Ionicons';

const getData = async () => {
    const sources = await Promise.all([Icon.getImageSource('md-map', 30),
    Icon.getImageSource('ios-menu', 30),
    ]).then(sourceData => {

        console.log(sourceData[0]);

        return [sourceData[0], sourceData[1]];
        // always use unique where you need to assign id
        // this.setState({ iconShare: sources[0] });
        // this.setState({ iconMenu: sources[1] });
        // console.log(this.state.iconMenu);

    }).catch(error => {
        console.error(error.message);
    });
    return sources;
};

export default getData;
