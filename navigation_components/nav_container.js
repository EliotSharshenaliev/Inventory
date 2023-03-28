import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from "react";
import TableOfBarcodes from "../screens/table";
import LoaderModalView from "../components/loader";
import MainScreen from "../screens/main";
import * as Camera from "expo-barcode-scanner";
import {Text, View} from "react-native";
import {CamScreen} from "../screens/cam";
import {Context} from "../context/context";

const Stack = createStackNavigator();

export default function AppContainer() {
    const { loading} = useContext(Context)

    const [hasPermissionLibrary, setHasPermissionLibrary] = useState(null);
    const [hasPermissionCamera, setHasPermissionCamera] = useState(null);

    useEffect(() => {
        const get_requests = async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermissionCamera(status === 'granted');
        }
        get_requests()
    }, []);

    if (hasPermissionCamera === null && hasPermissionLibrary === null) {
        return <LoaderModalView loading={true}/>;
    }
    if (!hasPermissionCamera && !hasPermissionLibrary) {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Нету доступа на {!hasPermissionCamera ? "Камеру" : ""} {!hasPermissionLibrary ? "Файлам" : ""}</Text>
            </View>
        )
    }

    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen options={{headerShown: false}} name="Home" component={MainScreen}/>
                    <Stack.Screen name="Сканирование" component={CamScreen}/>
                    <Stack.Screen name={"Список"} component={TableOfBarcodes}/>
                </Stack.Navigator>
            </NavigationContainer>
            {loading && <LoaderModalView/>}
        </>
    );

}


