import {Text, Modal, View, StyleSheet} from "react-native";



export default function LoaderModalView({loading}) {
    return (
        <Modal visible={loading} animationType="fade" transparent>
            <View style={styles.container}>
                <View style={styles.loaderContainer}>
                    <Text>Loading...</Text>
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
});