import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from "react";
import TableOfBarcodes from "../screens/table";
import LoaderModalView from "../components/loader";
import MainScreen from "../screens/main";
import {CamScreen} from "../screens/cam";
import MessageModalView from "../components/message";
import {BarCodeScanner} from "expo-barcode-scanner";
import * as MediaLibrary from 'expo-media-library';
import {Context} from "../context/context";

const Stack = createStackNavigator();

export function AppContainer() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const {loading} = useContext(Context)


    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await BarCodeScanner.requestPermissionsAsync();
            const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();

            setHasCameraPermission(cameraStatus === 'granted');
            setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
        })();
    }, []);



    return (
        <>
            <LoaderModalView loading={loading}/>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen options={{headerShown: false}} name="Локации" component={MainScreen}/>
                    <Stack.Screen name="Сканирование" component={CamScreen}/>
                    <Stack.Screen name={"Список"} component={TableOfBarcodes}/>
                </Stack.Navigator>
            </NavigationContainer>
            <MessageModalView/>
        </>
    );

}


