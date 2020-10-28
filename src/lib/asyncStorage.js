import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@storage_${key}`, value);
  } catch (e) {
    // saving error
  }
};

export const storeObjData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@storage_${key}`, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`@storage_${key}`);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log('error encounter');
  }
};

export const getObjData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@storage_${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('obj cannot be retrieve from store');
  }
};

export const clearStorage = async (data) => {
  try {
    const value = await AsyncStorage.removeItem(`@storage_${data}`);
    console.log('delete', value);
  } catch (error) {
    console.log('async key not available');
  }
};
