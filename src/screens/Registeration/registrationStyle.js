
import { StyleSheet, StatusBar } from 'react-native';
const styles = StyleSheet.create({
    cardContainer: {
        padding: 20,
        borderRadius: 20
    },
    containerStyle: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        marginTop: StatusBar.currentHeight,
        justifyContent: 'center'
    },
    dropDownPickerSellers: {
        marginTop: 20
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    forgot: {
        color: "#31C2AA",
        fontSize: 12,
        textAlign: "right"
    },
    imgContainer: {
        flex: 1
    },
    link: {
        color: "#31C2AA",
        textAlign: "center",
        marginTop: 5
    },
    loginBtn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        height: 50
    },
    radioBtn: {
        flexDirection: 'row', justifyContent: 'center'
    },
    spacerStyle: {
        marginBottom: 15,
    },
    safeContainerStyle: {
        flex: 1,
        margin: 20,
        justifyContent: "center",
    },
})


export default styles;