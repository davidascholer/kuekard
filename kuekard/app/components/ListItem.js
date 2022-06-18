import React, { useContext }  from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import AppContext from '../context/context';

const ListItem = ({ data, pressed, textStyle }) => {

    const appContext = useContext(AppContext);

    return (
        <Pressable onPress={() => { pressed(data) }}>
            <View style={[styles.item,{backgroundColor: appContext.colorTheme.medDark,borderBottomColor:appContext.colorTheme.dark}]}>
                <Text style={[styles.text,{color:appContext.colorTheme.medium}]}>{data}</Text>
            </View>
        </Pressable> 
    )
}

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: 1,
        flex: 1,
        padding: 15,
    },
    text: {
        fontSize: 25,
    },
});
export default ListItem;