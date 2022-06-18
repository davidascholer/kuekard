import React, { useContext, useState } from 'react';
import {  StyleSheet, Text, View } from 'react-native';

import AppContext from '../context/context';
import DeleteIcon from './icons/DeleteIcon';
import { appAlert } from './alerts/appAlert';

//List item for the selected set's data. Local only.
const ListItem = ({ color, icon, iconSize, onPress, sideA, sideB, stylesContainer, stylesItems }) => (
    <View style={stylesContainer}>
        <Text numberOfLines={1} style={[stylesItems, { color: color }]}>{sideA}</Text>
        <Text numberOfLines={1} style={[stylesItems, { color: color }]}>{sideB}</Text>
        {icon &&
            <DeleteIcon color={color} icon={icon} size={iconSize} handleOnPress={onPress} />
        }
        {!icon &&
            <View style={{ width: iconSize }} />
        }
    </View>
);

function CardList({ colorText, set, deleteCard, style, fontSize = 22, iconSize = 25 }) {
    const [editing, setEditing] = useState(false);
    const appContext = useContext(AppContext);

    const handleDeletePressed = index => {
        appAlert(
            "Delete Item",
            `Are you sure you want to delete ${index} from this set?`,
            "Cancel",
            "Yes",
            () => deleteCard(index)
        );
    }

    const handleAddPressed = index => {
        appAlert(
            "Delete Item",
            `Are you sure you want to delete ${index} from this set?`,
            "Cancel",
            "Yes",
            () => deleteCard(index)
        );
    }

    return (
        <View style={style}>
            <ListItem
                color={colorText}
                icon={editing ? 'closecircleo' : 'edit'}
                iconSize={iconSize}
                onPress={() => setEditing(!editing)}
                sideA={"front"}
                sideB={"back"}
                stylesContainer={styles.listItemContainer}
                stylesItems={{ ...styles.flatListText, fontWeight: 'bold', fontSize: fontSize }}
            />
            <View style={styles.flatList}>
                {set.map((item, index) => (
                    <ListItem
                        key={index}
                        icon={editing ? 'delete' : null}
                        iconSize={iconSize}
                        onPress={() => handleDeletePressed(index)}
                        sideA={item.english}
                        sideB={item[appContext.language]}
                        stylesContainer={styles.listItemContainer}
                        stylesItems={styles.flatListText}
                        color={colorText}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
    flatListText: {
        textAlign: 'center',
        margin: 2,
        fontSize: 20,
        fontWeight: '500'

    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingVertical: 5,
    }
});

export default CardList;