import { StyleSheet } from "react-native";
import {
    responsiveScreenHeight,
    responsiveScreenWidth,
    responsiveScreenFontSize,
    responsiveHeight,
    responsiveWidth,
  } from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
    /* mainContainer:{
        display:'flex',
        justifyContent:'center',
        //marginTop:20,
    },   */
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
        justifyContent: "space-between",
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
        alignItems: "flex-end",
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
        alignItems: "flex-start",
    },
    loginBtnContainer:{
        //backgroundColor:'red'
    },
    loginBtn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 70,
    },
    loginText: {
        color: "white",
        fontSize:18
    },
    listIcon: {
        marginRight: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      rightContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: responsiveWidth(15),
      },
      iconsContainer: {
        display: "flex",
        flexDirection: "row",
      },
      Container: {
        display: "flex",
        flexDirection: "row",
      },
      leftContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        width: responsiveWidth(65),
      },
      pic: {
        borderRadius: 30,
        width: 40,
        height: 40,
      },
});

export default styles;