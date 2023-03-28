import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import Modal from 'react-native-modal';

import {ExitButton} from "./button";


export default function ModalView({children, modalVisible, setModalVisible }) {

    return (
        <Modal
            animationType="fade"
            onBackButtonPress={() => setModalVisible(false)}
            backdropOpacity={0.2}
            visible={modalVisible}
            style= {{margin: 0}}
        >

            <View style={styles.modalContainer}>
                <View style={styles.content}>
                    {children}
                    <ExitButton name_icon={"exit-to-app"} title={"отменить"} onPress={() => setModalVisible(false)}/>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        padding: 20,
        backgroundColor: "white",
        borderRadius: 15,
    }
});

