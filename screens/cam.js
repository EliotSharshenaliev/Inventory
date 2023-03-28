import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Button from "../components/button";
import ScannerModal from "../components/camera";
import ScannerButton from "../components/scannerbtx";
import ModalView from "../components/modal_view";
import {styles_exp} from "../styles/style";
import {DataTable} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

export const CamScreen = ({route}) => {
    const {id, title} = route.params
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const [last_scanned_data, set_last_scanned] = useState([])
    const renderItem = ({item, index}) => (
        <DataTable.Row id={index}>
            <DataTable.Cell>{item.code}</DataTable.Cell>
            <DataTable.Cell>{item.article}</DataTable.Cell>
        </DataTable.Row>
    );

    const fn_insert_last_scannned = (new_obj) =>{
        set_last_scanned(
            [...last_scanned_data.slice(last_scanned_data.length - 2, last_scanned_data.length), new_obj]
        )
    }

    return (
        <View>

            <View style={[styles.modalContainer, {height:"90%"}]}>
                <View style={styles.contentContainer}>
                    <View style={styles.lineContainer}>
                    </View>
                    <View style={[ styles.title]}>
                        <Text style={styles_exp.subTitle}>Название локации: </Text>
                        <Text style={styles_exp.todoTitle}>{title}</Text>
                    </View>
                    <View style={styles.lineContainer}>
                    </View>
                    <View>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title numberOfLines={1}>Штрихкод</DataTable.Title>
                                <DataTable.Title >Артикул</DataTable.Title>

                            </DataTable.Header>

                            <FlatList
                                data={last_scanned_data}
                                renderItem={renderItem}
                                contentContainerStyle={{flexGrow: 1}}
                            />
                        </DataTable>
                    </View>

                    <ModalView modalVisible={modalVisible} setModalVisible={setModalVisible}>
                        <ScannerModal
                            locationId={id}
                            insert_last_scanned_callback={fn_insert_last_scannned}
                            modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                    </ModalView>
                    <ScannerButton onPress={() => setModalVisible(true)}/>
                    <Button title={"Список"} size={20} name_icon={"list"} onPress={()=> {
                        navigation.navigate('Список', {id_location: id})
                    }}/>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: "flex-start",
        backgroundColor: 'white',
        borderTopLeftRadius: 17,
        borderTopRightRadius: 17,
    },
    lineContainer: {
        width: '100%',
        height: 30,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        width: 500,
        height: 1,
        borderRadius: 5,
        backgroundColor: '#cdcdcd',
    },
    contentContainer: {
        flex: 1,
    },
    title: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        gap: "5%",
    }
});

