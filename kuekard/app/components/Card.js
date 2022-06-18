import React, { useContext }  from "react";
import { Text, StyleSheet, View } from "react-native";

import AppContext from "../context/context";

const Card = ({ cardFace, cardColorTheme, cardContent }) => {

    const appContext = useContext(AppContext);
    
    const lightTheme = StyleSheet.create({
    
        flipContainerFront: {
            backgroundColor: appContext.colorTheme.medLight,
        },
        flipContainerBack: {
            backgroundColor: appContext.colorTheme.medDark,
        },
        textFront: {
            color: appContext.colorTheme.medDark,
        },
        textBack: {
            color: appContext.colorTheme.medLight,
        },
    });
    const darkTheme = StyleSheet.create({
    
        flipContainerFront: {
            backgroundColor: appContext.colorTheme.medDark,
        },
        flipContainerBack: {
            backgroundColor: appContext.colorTheme.medLight,
        },
        textFront: {
            color: appContext.colorTheme.medLight,
        },
        textBack: {
            color: appContext.colorTheme.medDark,
        },
    });

    return (
        <>
            {cardColorTheme === "light" &&
                <View style={[
                    styles.flipContainer,
                    (cardFace === "front") ? lightTheme.flipContainerFront : lightTheme.flipContainerBack,
                ]}>
                    {cardFace === "front" && <Text style={[styles.text, lightTheme.textFront]}>
                        {cardContent}
                    </Text>}
                    {cardFace === "back" && <Text style={[styles.text, lightTheme.textBack]}>
                        {cardContent}
                    </Text>}
                </View>
            }
            {cardColorTheme === "dark" &&
                <View style={[
                    styles.flipContainer,
                    (cardFace === "front") ? darkTheme.flipContainerFront : darkTheme.flipContainerBack,
                ]}>
                    {cardFace === "front" && <Text style={[styles.text, darkTheme.textFront]}>
                        {cardContent}
                    </Text>}
                    {cardFace === "back" && <Text style={[styles.text, darkTheme.textBack]}>
                        {cardContent}
                    </Text>}
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({

    flipContainer: {
        alignContent: "center",
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
        width: '100%',
    },
    text: {
        fontSize: 20,
        textAlign: "center",
    },
});

export default Card;
