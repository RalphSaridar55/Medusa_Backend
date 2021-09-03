import { StyleSheet } from 'react-native';
export default StyleSheet.create({
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
    imageBkg: {
        flex: 1,
        justifyContent: "center"
    },
    forgot: {
        color: "#31C2AA",
        fontSize: 11,
        textAlign: "right"
    },
    headLine: {
        marginBottom: 10,
        color: "#698EB7",
        fontWeight: "bold"
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
    paragraph:{
        marginBottom: 10,
        color: "#000" 
    },
    signupText: {
        color: "#31C2AA",
        textAlign: "center"
    }
})