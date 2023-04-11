import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, Vibration} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import {useService} from "../db/services/service";
import {Context} from "../context/context";
import { Audio } from 'expo-av';

export default function ScannerModal({locationId, modalVisible, setModalVisible, insert_last_scanned_callback}) {
    const [scanned, setScanned] = useState(false);
    const {insert_items_compared_base, compare_base_with_scanned} = useService()
    const {setTypeOfMessage, setOpenState, setMessage, SetTimeOut} = useContext(Context)
    const [hasPermission, setHasPermission] = useState(null);
    const [soundObject, setSoundObject] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Audio.getPermissionsAsync();
            if (status !== 'granted') {
                await Audio.requestPermissionsAsync();
            }
            const sound = new Audio.Sound();
            await sound.loadAsync(require('./../media/signal.wav'));
            setSoundObject(sound);
        })();
    }, []);

    useEffect(()=> setScanned(false), [])


    const handleBarCodeScanned = async ({type, data}) => {
        setModalVisible(false)
        setScanned(true)
        const res = await compare_base_with_scanned(data)
        if(res.length > 0){
            soundObject.playAsync();
            await insert_last_scanned_callback({
                code: res[0].code,
                article: res[0].article
            })

            await insert_items_compared_base({
                code: res[0].code,
                article: res[0].article,
                locationId: locationId
            })
            setTypeOfMessage("success")
            setOpenState(true)
            setMessage(`${data} - успешно добавлен!!!`)
        }else {
            setTypeOfMessage("error")
            setOpenState(true)
            setMessage(`Ошибка, товар ${data} не найден!!!`)
            Vibration.vibrate()
        }
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

