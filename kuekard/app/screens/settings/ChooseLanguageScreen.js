import React, { useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import ScreenContainer from '../../components/ScreenContainer';
import BackNavButton from '../../components/icons/BackNavButton';
import AppContext from '../../context/context';

const languages = [
    'arabic',
    'chinese',
    'czech',
    'danish',
    'dutch',
    // 'english',
    'finnish',
    'french',
    'german',
    'greek',
    'hindi',
    'hungarian',
    'indonesian',
    'italian',
    'japanese',
    'korean',
    'norwegian',
    'polish',
    'portuguese',
    'romanian',
    'russian',
    'slovak',
    'spanish',
    'swedish',
    'thai',
    'turkish'
];

export default function ChooseLanguageScreen({ navigation }) {

    const appContext = useContext(AppContext);

    useEffect(() => {
        navigation.setOptions({ headerLeft: () => <BackNavButton goBack={goBack}>back</BackNavButton> });
    }, []);

    const goBack = () => {
        navigation.goBack();
    }

    const handleItemSelected = async item => {
        await appContext.setLanguageToDevice(item);
        await appContext.saveSettings(appContext.CACHE_ID_SETTINGS.LANGUAGE, item);
        navigation.goBack();
    }

    return (
        <ScreenContainer styleSheet={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                {languages.map(language => (
                    <Pressable onPress={() => handleItemSelected(language)} key={language} style={[styles.option, { borderBottomColor: appContext.colorTheme.medLight }]}>
                        <Text key={language} style={[styles.text, { color: appContext.colorTheme.light }]}>{language}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    option: {
        borderBottomWidth: 1,
        margin: 5,
        marginLeft:'10%',
        width: '80%',
    },
    scrollContainer:
    {
        textAlign:'center',
        width: '100%',
    },
    text: {
        fontSize: 25,
        marginBottom: 5,
        textAlign: 'center',
    },
});
