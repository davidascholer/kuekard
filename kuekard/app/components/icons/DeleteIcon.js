import React from 'react';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function DeleteIcon({color, handleOnPress, icon, size, styles}) {
  return (
    <View style={styles}>
        <AntDesign name={icon} size={size} color={color} onPress={handleOnPress}/>
    </View>
  );
}

export default DeleteIcon;