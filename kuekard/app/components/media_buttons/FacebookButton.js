/*
FACEBOOK

-Install expo-facebook and import

-Login to Facebook Developer and get an application id
  https://developers.facebook.com/apps/create/

-Create privacy policy to get out of development

-Add "facebookScheme":"fbAPPID" exp."fb12345678" to app.json file

-Set up ios and android in app.json as follows:
...
"ios": {
  "supportsTablet": true,
  "bundleIdentifier": "com.vamplitude.yourappname",
  "buildNumber": "1.0.0"
},
"android": {
  "package": "com.yourcompany.yourappname",
  "versionCode": 1,
  "adaptiveIcon": {
    "foregroundImage": "./assets/adaptive-icon.png",
    "backgroundColor": "#FFFFFF"
  }
},
...

-Build the projects (expo build:ios and expo build:android)

-Save "host.exp.Exponent" to Bundle ID under iOS

-Run `expo fetch:android:hashes`

-Copy Facebook Key Hash and paste it to Key Hashes under Android

-
*/
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Facebook from 'expo-facebook';
import { FontAwesome } from '@expo/vector-icons';

import { facebookID } from '../../config/environment-variables';

export default function FacebookButton({ handleMediaLogin, styleSheet }) {

  const logIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: facebookID,
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const jsonRes = await response.json();
        handleMediaLogin(jsonRes.name, jsonRes.id, "facebook");
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <TouchableOpacity
    activeOpacity={.8}
    onPress={logIn}
    style={[styleSheet.itemContainer,styles.container]}
    >
      <View style={[styleSheet.item, styles.item]}>
      <FontAwesome name="facebook" size={32} color="white" />
      <Text style={[styleSheet.text,styles.text]}>Login With Facebook</Text>
      </View>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({

  item: {
    backgroundColor: '#3b5998',
  },
})
