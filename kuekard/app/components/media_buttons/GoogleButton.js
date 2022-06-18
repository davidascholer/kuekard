import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';

import { googleIDs } from '../../config/environment-variables';

export default function GoogleButton({ handleMediaLogin, styleSheet }) {
 
const logIn = async () => {
  const config = {
    iosClientId: googleIDs.ios,
    androidClientId: googleIDs.android,
    scopes: ['profile','email']
  };

  Google.logInAsync(config).then( result =>{
    const {type, user} = result;

    if(type == 'success'){
      handleMediaLogin(user.name, user.id, "google");
    }
    else{}

  }).catch(error => {
    console.log("error: "+error);
  })
};

  return (
    <TouchableOpacity
      activeOpacity={.8}
      style={[styleSheet.itemContainer, styles.container]}
      onPress={logIn}
    >
      <View style={[styleSheet.item, styles.item]}>
        <FontAwesome name="google" size={32} color="white" />
        <Text style={[styleSheet.text, styles.text]}>Login With Google</Text>
      </View>
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#DD4F41',
  },
})
