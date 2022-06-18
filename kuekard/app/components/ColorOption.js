import React, { useContext }  from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import AppContext from '../context/context';

const ColorOption = ({ colors, content, styleSheet }) => {

    const appContext = useContext(AppContext);

    return (
        <View style={styles.optionContainer}>
            <Text style={[styles.text, {color:appContext.colorTheme.light}, styleSheet]}>{content}</Text>
            <View style={styles.colorContainer}>
                {Object.values(colors).map((color, index) => {
                    if (color)
                        return (
                            <View key={index} style={[styles.colorView, { backgroundColor: color, borderColor: appContext.colorTheme.light}]} />
                        )
                    else {
                        return (
                            <View key={index} style={[styles.colorView, { backgroundColor: color, borderColor: appContext.colorTheme.light}]} >
                                <Image source={require('../assets/images/red_x.png')} style={styles.image}></Image>
                            </View>
                        )
                    }
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    colorContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    colorView: {
        borderWidth: 1,
        width: 50,
        height: 50,
    },
    image: {
        aspectRatio: 1,
        backgroundColor:'white',
        flex: 1,
    },
    optionContainer: {
        flex: 1,
        margin: 20,
    },
    text: {
        flex: 4,
        fontSize: 20,
        textAlign: 'center',
    }
})

export default ColorOption;