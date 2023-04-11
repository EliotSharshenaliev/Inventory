import {View, Text, StyleSheet, TouchableOpacity, Switch, Animated} from "react-native";
import {AntDesign, Feather, MaterialIcons} from "@expo/vector-icons";
import {styles_exp} from "../styles/style";
import ModalView from "./modal_view";
import DeleteLocation from "./confirm_deletion_location";
import UpdateLocation from "./update_location";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {useService} from "../db/services/service";

const SizeOfLocation = ({id})=> {
    const {getLenghtOfCompared_with_location} = useService()
    const [value, setValue] = useState(0)
    useEffect( ()=> {
        const fetchData = async () => {
            const count = id ? await getLenghtOfCompared_with_location(id) : 0
            setValue(count)
        }
        fetchData()
    })

    return <Text>Товары: {value}</Text>
}

const Location = ({onPress, item, handleLocationPress, isSelected, toSelect}) => {

    const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false)

    const handlePressItemCallable = () => {
        if(toSelect){
            handleLocationPress(item.id)
        }else {
            onPress(item.id, item.title)
        }
    }



    return (
        <TouchableOpacity onLongPress={() => handleLocationPress(item.id)} onPress={handlePressItemCallable} style={styles_exp.todoContainer}>
            {isSelected ? (
                toSelect && <Feather name="check-circle" size={24} color="black" />
                        ) :
                        (
                            toSelect &&       <MaterialIcons name="radio-button-unchecked" size={27} color="black" />
                        )
            }
                <ModalView modalVisible={modalDeleteVisible} setModalVisible={setModalDeleteVisible}>
                <DeleteLocation id={item.id} setVisible={setModalDeleteVisible}/>
            </ModalView>

            <ModalView modalVisible={modalUpdateVisible} setModalVisible={setModalUpdateVisible}>
                <UpdateLocation id={item.id}  visible={modalUpdateVisible} setVisible={setModalUpdateVisible}/>
            </ModalView>

            <View >
                <Text style={styles_exp.todoTitle}>{item.title}</Text>
                <SizeOfLocation id={item.id}/>
            </View>
            <View style={styles_exp.location_btx}>
                <AntDesign onPress={() => setModalUpdateVisible(true)} name='edit' size={24} color='gray' />
                <AntDesign onPress={() => setModalDeleteVisible(true)} name='delete' size={24} color='red' />
            </View>
        </TouchableOpacity>
    );
};

export default Location;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkboxContainer: {
        padding: 0,
        marginRight: 8,
    },
    title: {
        fontSize: 18,
    },
    completed: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
});