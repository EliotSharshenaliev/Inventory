import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View} from "react-native";
import {FontAwesome5, Fontisto, MaterialIcons} from "@expo/vector-icons";

export const Button = ({size=30, onPress, title, name_icon}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <FontAwesome5 name={name_icon} size={size} color="white" />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export const Add_location = ({onPress, title}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export const ButtonRefresh = ({onPress})=> {
    return  (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <MaterialIcons name="refresh" size={24} color="white" />
        </TouchableOpacity>
    )
}

export const ButtonMore = ({onPressMore})=> {
    return  (
        <TouchableOpacity onPress={onPressMore}>
                <Fontisto name="more-v" size={24} color="black" />
        </TouchableOpacity>
    )
}


export const Add_location_main = ({onPress, title}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};
export const ExitButton = ({onPress, title, size=24}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button;



const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        padding: 10,
        margin: 10,
        backgroundColor: '#6c63ff',
        borderRadius: 10,

    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        marginLeft: 10,
        color: 'white',
    }
})