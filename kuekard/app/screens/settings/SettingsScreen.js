import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ScreenContainer from '../../components/ScreenContainer';
import CloseNavButton from '../../components/CloseNavButton';
import AppContext from '../../context/context';

const SettingsScreen = ({ navigation }) => {
    const [language, setLanguage] = useState();

    const appContext = useContext(AppContext);

    const close = () => {
        navigation.pop(1);
    }

    useEffect(() => {
        console.log(+"works");
        navigation.setOptions({ headerLeft: () => <CloseNavButton close={close}></CloseNavButton> })
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log("language from settings: " + appContext.language);
            if (appContext.language !== language)
                setLanguage(appContext.language);
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <ScreenContainer styleSheet={{ backgroundColor: appContext.colorTheme.dark }}>
            <Pressable
                onPress={() => navigation.navigate('ColorThemeScreen')}
            >
                <View style={[styles.option, { borderBottomColor: appContext.colorTheme.medium }]}>
                    <Text style={[styles.text, { color: appContext.colorTheme.light }]}>Color Themes</Text>
                </View>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('CardFaceSettingsScreen')}
            >
                <View style={[styles.option, { borderBottomColor: appContext.colorTheme.medium }]}>
                    <Text style={[styles.text, { color: appContext.colorTheme.light }]}>Card Settings</Text>
                </View>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate('ChooseLanguageScreen')}
            >
                <View style={styles.option}>
                    <Text style={[styles.text, { color: appContext.colorTheme.light }]}>Select Language</Text>
                </View>
            </Pressable>
            {language && language !== "" &&
                <View style={styles.bottom}>
                    <Text style={[styles.text, { color: appContext.colorTheme.light, fontSize: 15 }]}>Current Language: {appContext.language}</Text>
                </View>
            }
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    bottom: {
        marginTop: 'auto',
        marginBottom: 10
    },
    option: {
        padding: 15,
        borderBottomWidth: 2,
        borderBottomStartRadius: 50,
        borderBottomEndRadius: 50,
    },
    text: {
        fontSize: 25,
        textAlign: 'center',
    },
});

export default SettingsScreen;