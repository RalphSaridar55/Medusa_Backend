import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
    },
    inputView: {
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 25
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "#31C2AA",
        fontSize: 11,
        textAlign: "right"
    },
    loginBtn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10
    },
    loginText: {
        color: "white"
    },
    signupText: {
        color: "#31C2AA",
        textAlign: "center"
    },
    dropdown:{ 
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 4,
        paddingVertical: 15,
        backgroundColor: "#fff"
    }
});

export default styles;