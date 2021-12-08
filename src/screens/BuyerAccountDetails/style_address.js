
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
    },
    picker:{
              borderWidth: 1,
              borderColor: "#C4C4C4",
              borderRadius: 4,
              marginVertical: 10,
              height:55,
              justifyContent:'center',
              backgroundColor:'#fff'
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
    Btn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
        flex: 1
    },
    textButton:{
        fontSize:18,
        color:'white',
    },
    Dis_Btn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
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
    dropDownPickerSellers: {
        marginVertical: 10,
        borderRadius:5,
        borderColor:'#bbbbbb',
        backgroundColor:'#fff',
        color:'#bbbbbb',
        height:60,
    },
    header:{
        fontSize:24,
        marginBottom:20,
        color:'#6E91EC',
        fontFamily:'Adam-Bold',
        marginLeft:1
    }
});

export default styles