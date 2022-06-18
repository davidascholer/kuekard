import React, { useContext }  from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import AppContext from '../../context/context';

const BackNavButton = ({ children, goBack }) => {

    const appContext = useContext(AppContext);

    const iconStyles = {
        size: 22,
        color: appContext.colorTheme.medDark,
    }

    return (
        <Pressable style={styles.container} onPress={()=>goBack()}>
        <FontAwesome name={'arrow-left'} size={iconStyles.size} color={iconStyles.color} />
        <Text style={[styles.text,{color:appContext.colorTheme.medDark}]}>{children}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
    },
    text: {
        fontWeight:"bold",
        fontSize:18,
        marginLeft:5,
    },
})
export default BackNavButton;