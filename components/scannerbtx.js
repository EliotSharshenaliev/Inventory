import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ScannerButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <MaterialIcons name="qr-code-scanner" size={54} color="white" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6c63ff',
        borderRadius: 10,
        paddingTop: 30,
        paddingBottom: 30,
        padding: 20,
        margin: 10,
    },
    text: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
});

export default ScannerButton;