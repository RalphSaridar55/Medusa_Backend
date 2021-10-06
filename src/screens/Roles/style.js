import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
    },
    docPicker:{
        borderWidth:1,
        borderRadius:5,
        borderColor:'gray',
        marginVertical:10,
        height:55,
        display:'flex',
        flexDirection:'row',
        paddingHorizontal:10,
        alignItems:'center'
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
    dropdown:{ 
        borderWidth: 1,
        borderColor: '#C4C4C4',
        borderRadius: 4,
        paddingVertical: 15,
        backgroundColor: "#fff",
        marginBottom:10,
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
        marginHorizontal:15,
        marginBottom: 20
    },
    loginText: {
        color: "white",
        fontSize:16
    },
    signupText: {
        color: "#31C2AA",
        textAlign: "center"
    }
});

export default styles