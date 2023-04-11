import {StyleSheet} from "react-native"

export const styles_exp = StyleSheet.create({
    screen: {
        backgroundColor: "#fff",
        padding: 10,
    },
    header: {
        padding: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
    },
    container: {
        padding: 15,
    },
    text_Input: {
        width: "100%",
        padding: 12,
        marginBottom: 10,

    },
    todoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(108,99,255,0.13)",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    todoTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 8,
    },
    subTitle: {
        opacity: 0.6,
    },
    form: {
        flexDirection: "row",
        marginBottom: 40,
    },
    input: {
        borderWidth: 1,
        padding: 12,
        flex: 1,
        justifyContent: "center",
    },
    modalScreen: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    textInput: {
        borderWidth: 1,
        padding: 10,
        width: "95%",
        marginBottom: 15,
    },
    modalButton: {
        backgroundColor: "#0D4C92",
        padding: 10,
    },
    buttonText: {
        fontSize: 18,
        textAlign: "center",
        color: "#fff",
    },
    comment: { marginBottom: 20 },
    location_btx: {
        width: "30%",
        flexDirection: "row",
        justifyContent: "space-around"
    }

});