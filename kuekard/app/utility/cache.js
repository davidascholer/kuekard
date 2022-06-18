//React Native Debugger: showAsyncStorageContentInDev()
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
setItem() is used both to add new data item (when no data for given key exists), 
and to modify existing item (when previous data for given key exists).
*/
const storeStringValue = async (key, value) => {
    try {
        //retuns a null respone
        const res = await AsyncStorage.setItem(key, value);
        return true;
    } catch (e) {
        // saving error
        console.log(e);
    }
    return false;
}

/*
getItem returns a promise that either resolves to stored value when data is 
found for given key, or returns null otherwise.
*/
const readStringValue = async key => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (e) {
        // error reading value
        console.log(e);
    }
    return null;
}

const removeStringValue = async key => {
    try {
        await AsyncStorage.removeItem(key)
        return true;
    } catch (e) {
        // remove error
        console.log(e);
    }
    return false;
}

const clearAll = async () => {
    AsyncStorage.clear();
    // try {
    //     const allKeys = await AsyncStorage.getAllKeys();
    //     await AsyncStorage.multiRemove(allKeys);
    //     return true;
    // } catch (error) {
    //     console.log(error);
    // }
    // return false;
  }

export default {
    clearAll,
    storeStringValue,
    readStringValue,
    removeStringValue,
}
