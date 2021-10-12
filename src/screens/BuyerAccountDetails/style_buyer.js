import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
    },
    inputView: {
        backgroundColor: "#fff",
        marginBottom: 0,
        borderRadius: 25
    },
    inputText: {
        height: 50,
        color: "white"
    },
    docPicker:{
        borderWidth:1,
        borderRadius:5,
        borderColor:'gray',
        marginVertical:10,
        height:55,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center',
        backgroundColor:'#fff'
    },
    forgot: {
        color: "#31C2AA",
        fontSize: 11,
        textAlign: "right"
    },
    Btn: {
        backgroundColor: "#E3242B",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginRight:30,
        marginBottom: 10,
        flex: 1
    },
    sellingButton:{
        backgroundColor:'#B8B8B8',
        marginRight:0,
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:20
    },
    Dis_Btn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginLeft:30,
        marginBottom: 10,
        marginLeft: 5,
        flex: 1
    },
    loginText: {
        color: "white"
    },
    signupText: {
        color: "#31C2AA",
        textAlign: "center"
    },
    inputV: {
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 25,
        flex: 1,
        marginRight: 5
    },
    input_V: {
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 25,
        flex: 2
    },
    header:{
        fontSize:24,
        marginBottom:20,
        color:'#6E91EC',
        marginLeft:1
    },
    buttonsContainer:{ 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'flex-end',
        marginHorizontal:20
    }
});

export default styles