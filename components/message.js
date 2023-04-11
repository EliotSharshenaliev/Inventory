import {Text, View, StyleSheet, Animated} from "react-native";
import React, {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../context/context";
import {FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";


export default function MessageModalView() {
    const {isOpen, typeMessage, message} = useContext(Context)
    const slideAnim =  useRef(new Animated.Value(220)).current;
    const [color, setColor] = useState("green")
    const [colorBorder, setBorderColor] = useState("green")

    useEffect(() => {
        setColor(typeMessage === "warning" ?  "#ffa93a" : typeMessage === "success" ? "green": "red" )
        setBorderColor(typeMessage === "warning" ?  "#ffd082" : typeMessage === "success" ? "rgba(0,112,0,0.73)": "#ff9696" )

        if (isOpen) {
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
    }, [isOpen]);


    return (
        <>
            {isOpen &&
                <View style={styles.container}>
                <Animated.View style={[styles.box, { opacity: slideAnim }]}>
                    <View style={[styles.content, {backgroundColor: color, borderRightColor: colorBorder}]}>
                        <View style={styles.spinner}>
                            {   typeMessage === "success" ?
                                    <Ionicons name="checkmark-done-circle-sharp" size={24} color="white" />                                :
                                typeMessage === "warning" ?
                                    <FontAwesome name={"warning"} size={24} color="white" />
                                    :
                                    <MaterialIcons name="error" size={24} color="white" />                            }
                            <Text style={{ fontSize: 14,fontStyle: "italic", color: "white"}}>{message}</Text>
                        </View>
                    </View>
                </Animated.View>
                </View>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: "7%",
        right:8,
    },
    content: {
        flexDirection: "row",
        height: 50,
        // width: Dimensions.get('window').width - 30,
        paddingLeft: 20,
        paddingRight: 10,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderRightWidth: 10,
    },
    spinner: {
        gap: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});