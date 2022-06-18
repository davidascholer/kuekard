import React, { useContext, useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import BackNavButton from '../../components/icons/BackNavButton';
import ColorOption from '../../components/ColorOption';
import ScreenContainer from '../../components/ScreenContainer';
import cache from '../../utility/cache';
import AppContext from '../../context/context';
import { allColors } from '../../config/colors'

const ColorThemeScreen = ({ navigation }) => {
    const [colors, setColors] = useState({
        'light': null,
        'medLight': null,
        'medium': null,
        'medDark': null,
        'dark': null
    });
    const [colorThemeName, setColorThemeName] = useState('kuecard classic');

    const appContext = useContext(AppContext);

    //Handles rendering until the colors are loaded from async storage.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({ headerLeft: () => <BackNavButton goBack={goBack}>back</BackNavButton> });
        getColorTheme();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            setInitialColorsAsync();
        }, [])
    );
    //Initiate colors from async.
    const setInitialColorsAsync = async () => {

        const colorsCopy = colors;
        const cachedColors = await appContext.getCustomColorsFromDevice()
        const parsedColors = JSON.parse(cachedColors);

        if (cachedColors) {
            for (let color in colors) {
                if (parsedColors[color])
                    colorsCopy[color] = parsedColors[color]
            }

            setColors(colorsCopy);
        }

        setLoading(false);
    }


    const setColorPalette = palette => {
        setColorThemeName(palette);
        setColorThemeToCacheAsync(palette);
        appContext.setColorTheme(allColors[palette]);
    }

    const setCustomColorPalette = async () => {
        try {
            let nullCheckPassed = true;
            Object.values(colors).forEach(color => {
                if (!color)
                    nullCheckPassed = false;
            })
            if (nullCheckPassed) {
                setColorThemeName("custom");
                await setColorThemeToCacheAsync("custom");
                appContext.setColorTheme(colors);
                console.log(appContext.colorTheme);
            } else
                navigation.navigate('CreateColorThemeScreen', { colorPalette: colors })
        } catch (error) {
            console.log(error);
        }
    }

    const goBack = () => {
        navigation.goBack();
    }

    const setColorThemeToCacheAsync = async cardTheme => {
        try {
            await cache.storeStringValue(appContext.CACHE_ID_SETTINGS.CARD_THEME, cardTheme);
            await appContext.saveSettings(appContext.CACHE_ID_SETTINGS.CARD_THEME, cardTheme);
        } catch (error) {
            console.log(error);
        }
    }

    const getColorTheme = async () => {
        try {
            const cachedCardTheme = await cache.readStringValue(appContext.CACHE_ID_SETTINGS.CARD_THEME);
            if (cachedCardTheme) {
                setColorThemeName(cachedCardTheme);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const customColorPalette = {
        name: "Your Color Palette",
        colorTheme: {
            ...colors
        }
    }

    return (
        <ScreenContainer styleSheet={{ backgroundColor: appContext.colorTheme.dark }}>
            <ScrollView style={{ backgroundColor: appContext.colorTheme.dark }}>
                <ColorOption content={colorThemeName} styleSheet={[styles.text, { backgroundColor: appContext.colorTheme.medium }]} colors={appContext.colorTheme} />
                <View style={{ flex: 1, margin: 20 }}>
                    <Text style={[styles.text, { backgroundColor: appContext.colorTheme.medium }]}>select a different palette</Text>
                </View>
                {!loading && colorThemeName !== "custom" &&
                    <>
                        <Pressable key={"custom"} onPress={() => setCustomColorPalette("custom")}>
                            <ColorOption content={customColorPalette.name} colors={customColorPalette.colorTheme} />
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate('CreateColorThemeScreen', { colorPalette: colors })}>
                            <Text style={[styles.text, { color: appContext.colorTheme.medium }]}>EDIT</Text>
                        </Pressable>
                    </>
                }
                {
                    Object.keys(allColors)
                        .filter(colorPalette => colorPalette !== colorThemeName)
                        .map((colorPalette) => (
                            <Pressable key={colorPalette} onPress={() => setColorPalette(colorPalette)}>
                                <ColorOption content={colorPalette} colors={allColors[colorPalette]} />
                            </Pressable>
                        )
                        )
                }
            </ScrollView>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({

    text: {
        flex: 4,
        fontSize: 20,
        textAlign: 'center',
    }
})

export default ColorThemeScreen;