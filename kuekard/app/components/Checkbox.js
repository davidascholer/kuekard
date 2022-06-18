import React, { useState } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Checkbox({ children, isChecked, setIsChecked, color, size, style }) {

    const handleOnPress = () => {
        setIsChecked(!isChecked);
    }

    return (
        <View style={style}>
            {isChecked &&
                <Ionicons name={'checkbox'} size={size} color={color} onPress={handleOnPress} />
            }
            {!isChecked &&
                <Ionicons name={'checkbox-outline'} size={size} color={color} onPress={handleOnPress}/>
            }
            {children}
        </View>
    );
}


export default Checkbox;