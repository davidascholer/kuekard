/*
Expo configurations for logging in w 
Facebook (Android, ios), Google (Android, ios), and Apple (ios only)
*/
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import AppleButton from './media_buttons/AppleButton';
import FacebookButton from './media_buttons/FacebookButton';
import GoogleButton from './media_buttons/GoogleButton';

export default function MediaButtonContainer({ handleMediaLogin }) {

    return (
        <View style={styles.container}>
            <FacebookButton styleSheet={styles} handleMediaLogin={handleMediaLogin}/>
            <GoogleButton styleSheet={styles} handleMediaLogin={handleMediaLogin}/>
            {Platform.OS === "ios" && <AppleButton styleSheet={styles} handleMediaLogin={handleMediaLogin}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
    },
    item: {
        alignItems: 'center',
        backgroundColor: '#000000',
        borderRadius: 25,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
        },
        height: 55,
    },
    itemContainer: {
        width: '90%',
        height:55,
        margin:5,    
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    }
});
