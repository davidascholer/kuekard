import 'react-native-gesture-handler';
import React, { useState } from "react";

import AppNavigator from './app/navigation/AppNavigator';
import AppContext from './app/context/context';
import cache from './app/utility/cache';
import { allColors } from './app/config/colors';

//cache ids
const CACHE_ID_CARD_FACE = "@card-face";
const CACHE_ID_COLOR_THEME = "@color-theme";
const CACHE_ID_CUSTOM_COLORS = "@custom-colors";
const CACHE_ID_LANGUAGE = "@language";
// const CAHCE_ID_DEFAULT_COLOR_NAMES = { light: 'light', medLight: 'medLight', medium: 'medium', medDark: 'medDark', dark: 'dark' }
const CACHE_ID_DATA = "@data";
const CACHE_ID_USER = "@user";
const CACHE_ID_SETTINGS = {
  CARD_FACE: CACHE_ID_CARD_FACE,
  CARD_THEME: CACHE_ID_COLOR_THEME,
  CUSTOM_CARD_THEME: CACHE_ID_CUSTOM_COLORS,
  LANGUAGE: CACHE_ID_LANGUAGE
}
//constant vars
const GENERIC_USER = "no-user";
const GENERIC_USER_DATA = {
  name: null,
  data: {
    sets: null,
    settings: {
      "@card-face":null,
      "@color-theme":null,
      "@custom-colors":null,
      "@language":null
    }
  },
  token: null
};
const LANGUAGE = null;
const DEFAULT_COLORS = {
  light: null,
  medLight: null,
  medium: null,
  medDark: null,
  dark: null
}

function App() {
  const [user, setUser] = useState();
  const [data, setData] = useState();
  const [colorTheme, setColorTheme] = useState(allColors['kuekard classic']);
  const [language, setLanguage] = useState(LANGUAGE);

  const getLanguageFromDevice = async () => {
    try {
      const language = await cache.readStringValue(CACHE_ID_LANGUAGE);

      return language;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  const setLanguageToDevice = async lang => {
    try {
      await cache.storeStringValue(CACHE_ID_LANGUAGE, lang);
      return true;
    } catch (error) {
      console.log("error setting language on device");
      console.log(error);
      return false;
    }
  }
  const getColorThemeFromDevice = async () => {
    try {
      const language = await cache.readStringValue(CACHE_ID_COLOR_THEME);

      return language;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  const setColorThemeToDevice = async theme => {
    try {
      await cache.storeStringValue(CACHE_ID_COLOR_THEME, theme);
      return true;
    } catch (error) {
      console.log("error setting color on device");
      console.log(error);
      return false;
    }
  }
  const getCustomColorsFromDevice = async () => {
    try {
      const language = await cache.readStringValue(CACHE_ID_CUSTOM_COLORS);
      saveSettings();
      return language;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  const setCustomColorToDevice = async (colorKey, colorValue) => {
    try {
      let colors = await getCustomColorsFromDevice();
      colors = JSON.parse(colors);
      if (!colors)
        colors = DEFAULT_COLORS;

      colors[colorKey] = colorValue;
      const parsedColors = JSON.stringify(colors);

      await cache.storeStringValue(CACHE_ID_CUSTOM_COLORS, parsedColors);
      saveSettings()
      return true;
    } catch (error) {
      console.log("error storing custom colors on device");
      console.log(error);
      return false;
    }
  }

  const getDataFromDevice = async () => {
    try {
      const userData = await cache.readStringValue(CACHE_ID_DATA);
      return JSON.parse(userData);
    } catch (error) {
      console.log("error getting data from device");
      console.log(error);
    }
  }

  const saveData = async data => {//change to saveDataToDevice
    try {
      const userData = JSON.stringify(data);
      await cache.storeStringValue(CACHE_ID_DATA, userData);
      setData(data);
      console.log("data saved");
      // console.log(data);
    } catch (error) {
      console.log("error storing data on device");
      console.log(error);
    }
  }

  const saveGenericData = () => {
    try {
      const userData = JSON.stringify(GENERIC_USER_DATA);
      console.log('userData: ' + userData)
      cache.storeStringValue(CACHE_ID_DATA, userData);
      setData(userData);
      console.log("generic data saved");
      // console.log(data);
    } catch (error) {
      console.log("error storing generic data on device");
      console.log(error);
    }
  }

  //Save either: language, cardFace, or cardTheme.
  const saveSettings = async (settingID, dataToSave) => {

    try {
      //Get the data so we can update it
      const data = await getDataFromDevice();

      if (settingID === CACHE_ID_SETTINGS.CUSTOM_CARD_THEME) {
        //Get the setting to update from device
        const newSettings = await getCustomColorsFromDevice();
        //Set the settings in the data to the new key/value pair
        data.data.settings[settingID] = newSettings;
      } else {
        console.log('saving: '+dataToSave)
        //Set the settings in the data to the new key/value pair
        data.data.settings[settingID] = dataToSave;
      }

      //Set the data
      await saveData(data);

    } catch (error) {
      console.log("error saving settings on device");
      console.log(error);
    }
  }


  const getSettingsFromDevice = async () => {
    try {
      const data = await getDataFromDevice();
      return data.data.settings;
    } catch (error) {
      console.log(error);
    }
  }
  // const getDataFromServer = async data => {
  //   try {
  //     setData(JSON.parse(data));
  //     // console.log(data);
  //   } catch (error) {
  //     console.log("error storing data on device");
  //     console.log(error);
  //   }
  // }

  // const setDataToServer = async data => {
  //   try {
  //     console.log("data backed up successfully")
  //   } catch (error) {
  //     console.log("could not back up data online");
  //     console.log(error);
  //   }
  // }

  //Set a JWT in value of the @user key of cache and sets it in the user state
  const saveUser = async token => {
    try {
      await cache.storeStringValue(CACHE_ID_USER, token);
      setUser(token);
    } catch (error) {
      console.log(error);
    }
  }

  //Set a JWT in value of the @user key of cache and sets it in the user state
  const saveGenericUser = async () => {
    try {
      await cache.storeStringValue(CACHE_ID_USER, GENERIC_USER);
      setUser(GENERIC_USER);
    } catch (error) {
      console.log(error);
    }
  }

  //Removes the user from the state and the cache
  const removeUser = async () => {
    try {
      await cache.removeStringValue(CACHE_ID_USER);
      setUser(null)
    } catch (error) {
      console.log(error);
    }
  }

  //Gets the user from the cache and sets it to the state
  const getUser = async () => {
    try {
      const token = await cache.readStringValue(CACHE_ID_USER);
      setUser(token);
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  const clearAll = async () => {
    try {
      await cache.clearAll();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AppContext.Provider value={{
      //cache ids
      CACHE_ID_COLOR_THEME,
      CACHE_ID_CUSTOM_COLORS,
      CACHE_ID_DATA,
      CACHE_ID_LANGUAGE,
      CACHE_ID_SETTINGS,
      CACHE_ID_USER,
      //defaults vars
      DEFAULT_COLORS,
      GENERIC_USER,
      //variables
      language,
      colorTheme,
      data,
      user,
      //getters
      getColorThemeFromDevice,
      getCustomColorsFromDevice,
      getDataFromDevice,
      getLanguageFromDevice,
      getUser,
      // getDataFromServer,
      //setters
      setColorTheme,
      setColorThemeToDevice,
      setCustomColorToDevice,
      setLanguageToDevice,
      saveData,
      saveGenericData,
      saveGenericUser,
      saveSettings,
      saveUser,
      //functions
      removeUser,
      clearAll
    }} >
      <AppNavigator />
    </AppContext.Provider>
  );
}

export default App;