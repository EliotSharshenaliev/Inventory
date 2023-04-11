import {Text, View, StyleSheet, ActivityIndicator} from "react-native";
import Modal from "react-native-modal"
import {useContext} from "react";
import {Context} from "../context/context";


export default function LoaderModalView({loading}) {

    return (
        <Modal style={{margin: 0}}  backdropOpacity={0.01}  backdropColor={"white"} visible={loading} animationType="fade" transparent>
            <View style={styles.container}>
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loaderContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
    },
    spinner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});