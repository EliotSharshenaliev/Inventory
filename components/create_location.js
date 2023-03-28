import React, {useContext, useState} from 'react';
import {Pressable, TextInput, View, Text} from "react-native";
import {styles_exp} from "../styles/style";
import {Add_location} from "./button";
import {useService} from "../db/services/service";
import {Context} from "../context/context";

const CreateLocation = ({visible, setVisible}) => {
    const [input, setInput] = useState("");
    const {create_location} = useService()
    const handleSubmit = async () => {
        if (input.trim()) {
            await create_location({ input })
            setVisible(!visible);
        }
    };
    return (
        <View>
            <TextInput
                placeholder={"Название локации"}
                style={styles_exp.text_Input}
                value={input}
                autoFocus={true}
                onChangeText={(value) => setInput(value)}
            />

            <Add_location onPress={handleSubmit} title={"сохранить"}/>
        </View>
    );
};

export default CreateLocation;