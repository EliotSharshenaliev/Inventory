import React, {useContext, useState} from 'react';
import {TextInput, View} from "react-native";
import {styles_exp} from "../styles/style";
import {Add_location} from "./button";
import {useService} from "../db/services/service";

const CreateLocation = ({get_list, visible, setVisible}) => {
    const [input, setInput] = useState("");
    const {create_location} = useService()
    const handleSubmit = async () => {
        if (input.trim()) {
            await create_location({ input })
            setVisible(!visible);
            get_list()
        }
    };
    return (
        <View>
            <TextInput
                placeholder={"Название локации"}
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

export default CreateLocation;