import {Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Add_location_main, Button, ButtonMore, ButtonRefresh} from "../components/button";
import {useService} from "../db/services/service";
import {useBackgroundTask} from "../hooks/background_worker";
import Location from "../components/location";
import ModalView from "../components/modal_view";
import CreateLocation from "../components/create_location";
import * as DocumentPicker from "expo-document-picker";
import {styles_exp} from "../styles/style";
import {Context} from "../context/context";


const MainScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const {setLoading} = useContext(Context)
    const [locations, setLocations] = useState([]);


    const get_list = useCallback(
        async () => {
            const response = await get_list_of_locations()
            setLocations(response)
        }, [locations])

    const {
        importExcel,
        exportToExcel
    } = useBackgroundTask();

    const {
        insert_items_base_codes,
        get_export_datas,
        getItems,
        get_list_of_locations
    } = useService()


    useEffect(()=> {
        get_list()
    }, [locations])

    const fn_import = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory: false});
            if(result.type === "success"){
                setModalVisible(false)
                setLoading(true)
                const data = await importExcel(result);
                const result_db = await insert_items_base_codes(data)
                if(result_db.uploaded === "success"){
                    const length = await getItems()
                    Alert.alert(`Успешно загружено ${length} товары`)
                }
            }
        }catch (e){
            console.log(e)
        }finally {
            setLoading(false)
        }
    };

    const fn_export = async () => {
        setModalVisible(false);
        setLoading(true);

        try {
            const _array = await get_export_datas();
            const exported = await exportToExcel(_array);
            if(exported){
                Alert.alert("Успешно экспортировано")
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }



    return (

        <>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={"dark-content"} />
                <ModalView modalVisible={modalVisible2} setModalVisible={setModalVisible2}>
                    <CreateLocation visible={modalVisible2} setVisible={setModalVisible2}/>
                </ModalView>

                <View style={styles.row}>
                    <Add_location_main onPress={useCallback(() => setModalVisible2(!modalVisible2), [])} title={"Создать локацию"}/>

                    <View style={[styles.container, {alignItems: "flex-end", marginRight: 10}]}>
                        <ButtonMore onPressMore={useCallback(() => setModalVisible(true), [])}/>
                    </View>

                    <ModalView modalVisible={modalVisible} setModalVisible={setModalVisible}>
                        <View>
                            <View style={styles_exp.screen}>
                                <ButtonRefresh onPress={get_list}/>
                                <Button onPress={fn_import} name_icon={"file-import"} title={"Импорт"}/>
                                <Button onPress={fn_export} name_icon={"file-export"} title={"Экспорт"}/>
                            </View>
                        </View>
                    </ModalView>
                </View>
                <View style={styles.row}>
                    <View style={styles.container}>
                        <FlatList
                            style={{maxHeight: "100%"}}
                            data={locations}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => <Location
                                onPress={()=> navigation.navigate("Сканирование", {id: item.id, title: item.title})}
                                item={item}/>}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        justifyContent: "center",
        paddingVertical: 6
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-around',
    }
});

export default MainScreen;
