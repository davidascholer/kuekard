import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

const CustomModal = ({ children, styleSheet, visibility }) => {

    const [modalVisible, setModalVisible] = useState(false);

    return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={visibility}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                style={[styles.modal,styleSheet]}
            >
                {children}
            </Modal>
    );
}

const styles = StyleSheet.create({
    modal:{
        backgroundColor:"#ffffff",
    }
});

export default CustomModal;