import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Text, Alert, ScrollView} from 'react-native';
import {useService} from "../db/services/service";
import {DataTable} from "react-native-paper"

export default function TableOfBarcodes({route}) {
    const [data, setData] = useState([]);
    const {get_confirmed_list, delete_item_from_confirmed_place} = useService()
    const {id_location} = route.params
    useEffect(() => {
        get_confirmed_list(id_location, setData)
    }, []);

    const handleConfirmation = (item) => {
        Alert.alert(
            'Предупреждение',
            'Вы действительно хотите удалить элемент?',
            [
                {
                    text: 'Отменит',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        delete_item_from_confirmed_place(item.id)
                        get_confirmed_list(id_location, setData)
                    },
                },
            ],
            {cancelable: false}
        );
    };
    const renderItem = ({item, index}) => (
        <DataTable.Row onPress={() => handleConfirmation(item)}>
            <DataTable.Cell style={{width: 100}} >{index + 1}</DataTable.Cell>
            <DataTable.Cell style={{width: 150}} >{item.code}</DataTable.Cell>
            <DataTable.Cell style={{width: 250}} >{item.article}</DataTable.Cell>
            <DataTable.Cell style={{width: 150}} numeric>{item.scanned_at}</DataTable.Cell>
        </DataTable.Row>
    );
    return (
        <ScrollView horizontal={true}>
            <View style={styles.container}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{width: 100}} >Id</DataTable.Title>
                        <DataTable.Title style={{width: 150}}   >Штрихкод</DataTable.Title>
                        <DataTable.Title style={{width: 250}}  >Артикул</DataTable.Title>
                        <DataTable.Title style={{width: 150}} >Время сканирования</DataTable.Title>
                    </DataTable.Header>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{flexGrow: 1}}
                    />
                </DataTable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "90%"
    },
    rightActions: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 24,
    },
    codeCell: {
        width: 100,
    },
});
