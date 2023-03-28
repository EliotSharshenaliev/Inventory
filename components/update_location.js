import React, {useState} from 'react';
import {TextInput, View, Text} from "react-native";
import {styles_exp} from "../styles/style";
import {Add_location} from "./button";
import {useService} from "../db/services/service";

const UpdateLocation = ({visible, setVisible, id}) => {
    const [input, setInput] = useState("");
    const {update_location} = useService()
    const handleSubmit = () => {
        if (input.trim()) {
            update_location({ input }, id)
            setVisible(false);
        }
    };
    return (
        <View>
            <TextInput
                placeholder={"Новое название локации"}
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