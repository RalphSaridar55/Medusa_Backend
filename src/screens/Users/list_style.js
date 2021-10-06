import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer:{
        display:'flex',
        justifyContent:'center',
        //marginTop:20,
    },  
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        //borderBottomWidth: 1,
        padding: 10,
    },
    pic: {
        borderRadius: 30,
        width: 40,
        height: 40,
    },
    nameContainer: {
    },
    touchable:{
        display: "flex",
        borderWidth: 1,
        borderColor: "#D3D3D3",
        marginBottom: 10,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 20,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#31c2aa',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
    },
    loginBtnContainer:{
        backgroundColor: "#E9F3FF",
    },
    loginBtn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
    },
    loginText: {
        color: "white",
        fontSize:18
    },
});

export default styles;