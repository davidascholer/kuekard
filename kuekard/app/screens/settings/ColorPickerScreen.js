
import React, { useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { TriangleColorPicker } from 'react-native-color-picker'

export const ColorPicker = ({ lastColor, setCustomColor, setModalVisible }) => {

    const [tempColor, setTempColor] = (lastColor) ? useState(lastColor) : useState("#ffffff");

    const handleColorChange = (color) => {
        setTempColor(color);
    }
    const handleNewColorSelected = color => {
        setCustomColor(color);
        setModalVisible(false);
    }
    const handleOldColorSelected = color => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
                            {/* <Text style={styles.text}>Old Color{"\n"}(click to go back)</Text> */}

            <TriangleColorPicker
                oldColor = {(lastColor) ? lastColor : 'blue' }
                color={tempColor}
                onColorChange={handleColorChange}
                onColorSelected={color => handleNewColorSelected(color)}
                onOldColorSelected={color => handleOldColorSelected(color)}
                style={styles.colorPickerContainer}
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Old Color{"\n"}(click to go back)</Text>
                <Text style={styles.text}>New Color{"\n"}(click to select)</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 45, backgroundColor: '#212021'},
    colorPickerContainer:{
        flex:10,
    },
    textContainer: {
        alignContent:'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-evenly',
        
    },
    text: {
        color: 'white',
        flex: 1,
        margin: 10,
        textAlign: 'center',
    },
})