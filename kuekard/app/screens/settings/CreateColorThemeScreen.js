/*
Uses react-native-color-picker to pick a color and sets it to asyncstorage.
*/
import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import CustomModal from '../../components/CustomModal';
import BackNavButton from '../../components/icons/BackNavButton';
import ScreenContainer from '../../components/ScreenContainer';
import AppContext from '../../context/context';
import { ColorPicker } from './ColorPickerScreen';

const CreateColorThemeScreen = ({ route, navigation }) => {

    const appContext = useContext(AppContext);
    
    //Set the passed color object to be used to populate the color components.
    const [colors, setColors] = useState(route.params.colorPalette);
    //Setting modalVisible to true shows the color picker screen.
    const [modalVisible, setModalVisible] = useState(false);
    //Keep a state var of the last color picked to send to the initialization of the color picker screen.
    const [lastColorPicked, setLastColorPicked] = useState("#ffffff");
    //Keeps track of the selected key of the colors object.
    const [colorKey, setColorKey] = useState(null);

    useEffect(() => {
        navigation.setOptions({ headerLeft: () => <BackNavButton goBack={goBack}>back</BackNavButton> });
    }, [])

    //Method returned when color is picked from the color picker screen.
    const setCustomColor = color => {
        setLastColorPicked(color);
        saveColorAsync(colorKey, color);
        const colorsCopy = {
            ...colors,
            [colorKey]: color
        }
        setColors(colorsCopy);
    }

    //Saves the color value to storage.
    const saveColorAsync = async (colorKey, colorValue) => {
        try {
            // const newColors = await appContext.getCustomColorsFromDevice(appContext.CACHE_ID_CUSTOM_COLORS);
            await appContext.setCustomColorToDevice(colorKey, colorValue);
            await appContext.saveSettings(appContext.CACHE_ID_SETTINGS.CUSTOM_CARD_THEME);
        } catch (error) {
            console.log(error);
        }
    }

    const goBack = () => {
        navigation.goBack();
    }

    //Local component only. Set the color or sets an "x" image if null.
    const ColorItem = ({ colorKey, textContent }) => {
        return (
            <Pressable onPress={() => {
                setModalVisible(true);
                setColorKey(colorKey);
            }}>
                <View style={styles.optionContainer}>
                    <Text style={[styles.text,{color:appContext.colorTheme.light}]}>{textContent}</Text>
                    {colors[colorKey] &&
                        <View style={[styles.colorView, { backgroundColor: colors[colorKey], borderColor: appContext.colorTheme.light }]} />}
                    {!colors[colorKey] &&
                        <View style={styles.colorView}>
                            <Image source={require('../../assets/images/red_x.png')} style={styles.image}></Image>
                        </View>
                    }
                </View>
            </Pressable>
        )
    }

    return (
        <ScreenContainer styleSheet={{ backgroundColor: appContext.colorTheme.dark }}>
            <ScrollView style={{backgroundColor: appContext.colorTheme.dark}}>
                <ColorItem
                    colorKey={"light"}
                    textContent={"Light accent color:"}
                />
                <ColorItem
                    colorKey={"medLight"}
                    textContent={"Light theme color:"}
                />
                <ColorItem
                    colorKey={"medium"}
                    textContent={"Main theme color:"}
                />
                <ColorItem
                    colorKey={"medDark"}
                    textContent={"Dark theme color:"}
                />
                <ColorItem
                    colorKey={"dark"}
                    textContent={"Dark accent color:"}
                />
            </ScrollView>

            <CustomModal visibility={modalVisible}>
                <ColorPicker setCustomColor={setCustomColor} setModalVisible={setModalVisible} lastColor={lastColorPicked} />
            </CustomModal>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    colorView: {
        alignContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center',
        width: 60,
        height: 60,
    },
    image: {
        aspectRatio: 1,
        flex: 1,
    },
    optionContainer: {
        alignContent: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },
    text: {
        flex: 5,
        fontSize: 20,
        height: 50,
        textAlign: 'center',
    }
})

export default CreateColorThemeScreen;