/* eslint-disable prettier/prettier */
import { Platform } from 'react-native';
import storage from '@react-native-firebase/storage';

// create bucket storage reference to not yet existing image
const reference = storage().ref('black-t-shirt-sm.png');
export const FireBaseStorage = storage();
export const getFileLocalPath = response => {
    const { path, uri } = response;
    return Platform.OS === 'android' ? path : uri;
};

export const createStorageReferenceToFile = response => {
    const { fileName } = response;
    return FireBaseStorage.ref('black-t-shirt-sm.png');
};


export const uploadFileToFireBase = imagePickerResponse => {
    const fileSource = getFileLocalPath(imagePickerResponse);
    const storageRef = createStorageReferenceToFile(imagePickerResponse);
    return storageRef.putFile(fileSource);
};

