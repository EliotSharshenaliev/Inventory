import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FontAwesome5} from "@expo/vector-icons";



const HeaderListButton = ({onPress}) => {

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <FontAwesome5 name={"list"} size={27} color="blue" />
        </TouchableOpacity>
);
};



const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        padding: 10,
        // backgroundColor: '#6c63ff',

    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        marginLeft: 10,
        color: 'white',
    },
});

export default HeaderListButton;
