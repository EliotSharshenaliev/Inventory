import React, {useContext, useState} from 'react';
import {Pressable, TextInput, View, Text, StyleSheet} from "react-native";
import {styles_exp} from "../styles/style";
import {Add_location} from "./button";
import {useService} from "../db/services/service";
import {LocationContext} from "../context/location_context";

const DeleteLocation = ({id, setVisible}) => {
    const {get_list} = useContext(LocationContext)

    const {delete_location} = useService()
    const handleSubmit = async () => {
        await delete_location(id)
        setVisible(false)
        get_list()
    }

    return (
        <View>
            <View style={styles_exp.screen}>
                <Text style={styles_exp.todoTitle}>Вы действительно хотите удалить локацию? </Text>
                <Text style={styles_exp.subTitle}>Будет удалено все сканированные товары в этом локации </Text>
            </View>

            <Add_location onPress={handleSubmit} title={"Да"}/>
        </View>
    );
};

export default DeleteLocation;


