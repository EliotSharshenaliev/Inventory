import {FlatList, SafeAreaView, StatusBar, StyleSheet, View, Text, Dimensions} from "react-native";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {Add_location, Add_location_main, Button, ButtonMore} from "../components/button";
import {useService} from "../db/services/service";
import {useBackgroundTask} from "../hooks/background_worker";
import Location from "../components/location";
import ModalView from "../components/modal_view";
import CreateLocation from "../components/create_location";
import * as DocumentPicker from "expo-document-picker";
import {styles_exp} from "../styles/style";
import {Context} from "../context/context";
import {LocationContext} from "../context/location_context";

const MainScreen = ({navigation}) => {
    const [modalVisible2, setModalVisible2] = useState(false);
    const {setLoading} = useContext(Context)
    const {setTypeOfMessage, setOpenState, setMessage, SetTimeOut} = useContext(Context)
    const {get_list,
        locations,
        selectedLocations,
        setSelectedLocations,
        modalVisible, setModalVisible
    } = useContext(LocationContext)

    const [toSelect, setState] = useState(null)

    useEffect(()=> {
        if(selectedLocations.length <= 0){
            setState(false)
        }else{
            setState(true)
        }
    }, [selectedLocations])


    const handleLocationPress = useCallback((locationId) => {
        setSelectedLocations(prevLocations => {
            const index = prevLocations.indexOf(locationId);
            if (index > -1) {
                return prevLocations.filter((id) => id !== locationId);
            } else {
                return [...prevLocations, locationId];
            }
        });
    },[]);


    const {
        importExcel,
        fn_export
    } = useBackgroundTask();

    const {
        insert_items_base_codes,
        getItems,
    } = useService()


    useEffect(()=> {
        get_list()
    }, [modalVisible, modalVisible2])

    useEffect(()=> {
        get_list()
    }, [])

    const fn_import = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            if(result.type === "success"){
                setModalVisible(false)
                setLoading(true)
                const data = await importExcel(result);
                const result_db = await insert_items_base_codes(data)
                if(result_db.uploaded === "success"){
                    const length = await getItems()
                    setTypeOfMessage("success")
                    SetTimeOut(2500)
                    setOpenState(true)
                    setMessage(`Успешно загружено ${length} товары`)
                }
            }
        }catch (e){
            console.log(e)
        }finally {
            setLoading(false)
        }
    };



    useEffect(()=> {
        if(locations && locations.length <= 0){
            setTypeOfMessage("warning")
            SetTimeOut(2500)
            setOpenState(true)
            setMessage(`Пусто, создайте новые локации`)
        }
    }, [])

    const dataNotExistStyle = {
        height: Dimensions.get("window").height / 1.3,
        justifyContent: "center",
    }

    return (

        <>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={"dark-content"} />
                <ModalView modalVisible={modalVisible2} setModalVisible={setModalVisible2}>
                    <CreateLocation get_list={get_list} visible={modalVisible2} setVisible={setModalVisible2}/>
                </ModalView>

                <View style={styles.row}>
                    <Add_location_main onPress={useCallback(() => setModalVisible2(!modalVisible2), [])} title={"Создать локацию"}/>

                    <View style={[styles.container, {alignItems: "flex-end", marginRight: 10}]}>
                        <ButtonMore onPressMore={useCallback(() => setModalVisible(true), [])}/>
                    </View>

                    <ModalView modalVisible={modalVisible} setModalVisible={setModalVisible}>
                        <View>
                            <View style={styles_exp.screen}>
                                {selectedLocations.length > 0 && <Add_location onPress={() => {
                                    setSelectedLocations([])
                                    setModalVisible(false)
                                }} title={"Отменить"}/>}
                                <Button disabled = {false} onPress={fn_import} name_icon={"file-import"} title={"Импорт"}/>
                                {selectedLocations.length > 0 && <Button disabled = {true} onPress={fn_export} name_icon={"file-export"} title={"Экспорт"}/>}
                            </View>
                        </View>
                    </ModalView>
                </View>
                <View style={styles.row}>
                    <View style={locations && !locations.length <= 0 ? [styles.container, dataNotExistStyle] : styles.container}>
                        <FlatList
                            style={{maxHeight: "100%"}}
                            data={locations}
                            keyExtractor={(item) => item.id}
                            ListEmptyComponent={<Text style={{textAlign: "center",color: "gray", fontSize: 16}}>Локации не найдены</Text>}
                            renderItem={({item}) => <Location
                                toSelect={toSelect}
                                handleLocationPress={handleLocationPress}
                                isSelected={selectedLocations.includes(item.id)}
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
