import React, {useContext, useState} from 'react';
import {TextInput, View, Text} from "react-native";
import {styles_exp} from "../styles/style";
import {Add_location} from "./button";
import {useService} from "../db/services/service";
import {LocationContext} from "../context/location_context";

const UpdateLocation = ({visible, setVisible, id}) => {
    const {get_list} = useContext(LocationContext)
    const [input, setInput] = useState("");
    const {update_location} = useService()
    const handleSubmit = () => {
        if (input.trim()) {
            update_location({ input }, id)
            setVisible(false);
            get_list()
        }
    };
    return (
        <View>
            <TextInput
                placeholder={"Новое название локации"}
                placeholderTextColor="gray"
                style={styles_exp.text_Input}
                value={input}
                autoFocus={true}
                onChangeText={(value) => setInput(value)}
            />

            <Add_location onPress={handleSubmit} title={"сохранить"}/>
        </View>
    );
};

export default UpdateLocation;