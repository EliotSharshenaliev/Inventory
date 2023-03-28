import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, Vibration} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useService} from "../db/services/service";
import {Context} from "../context/context";

export default function ScannerModal({locationId, modalVisible, setModalVisible, insert_last_scanned_callback}) {
    const [scanned, setScanned] = useState(false);
    const {insert_items_compared_base, compare_base_with_scanned} = useService()
    useEffect(()=> setScanned(false), [])

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true)
        compare_base_with_scanned(data, async (_array)=> {
            try {
                insert_last_scanned_callback({
                    code: _array[0].code,
                    article: _array[0].article
                })
                insert_items_compared_base({
                    code: _array[0].code,
                    article: _array[0].article,
                    locationId: locationId
                })
                Alert.alert("успешно добавлен")
            }catch (e) {
                console.log(e)
                Alert.alert("Ошибка: " + e.message)
                Vibration.vibrate()
            }finally {
                setModalVisible(!modalVisible)
            }
        })
    };

    return (
        <>
            {modalVisible && <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={[styles.scanner, {backgroundColor: "white",}]}
            /> }
        </>
    );
}

const styles = StyleSheet.create({
    scanner: {
        width: 300,
        height: 200,
    }
});

