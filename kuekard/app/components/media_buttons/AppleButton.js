
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import * as AppleAuthentication from 'expo-apple-authentication';

export default function AppleButton({ handleMediaLogin, styleSheet }) {

  const logIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
      const {givenName,familyName} = credential.fullName;
      const name = `${givenName} ${familyName}`;
      handleMediaLogin(name, credential.user, "apple");
    } catch (e) {
      if (e.code === 'ERR_CANCELED') {
        // handle that the user canceled the sign-in flow
      } else {
        // handle other errors
      }
    }

  }

  return (

    <TouchableOpacity
      activeOpacity={.8}
      style={[styleSheet.itemContainer, styles.container]}
      onPress={logIn}
    >
      <View style={[styleSheet.item, styles.item]}>
        <FontAwesome name="apple" size={32} color="white" />
        <Text style={[styleSheet.text, styles.text]}>Login With Apple</Text>
      </View>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  item: {
    borderColor: '#ffffff',
    borderWidth: 1,
  }
})
