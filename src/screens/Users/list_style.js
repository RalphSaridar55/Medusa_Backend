import { StyleSheet } from "react-native";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  touchable: {
    display: "flex",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    padding: 2,
  },

  nameContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  nameTxt: {
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
    fontFamily:'Inter-Black-Medium'
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13,
    alignItems: "flex-end",
    fontFamily:'Inter-Black-Medium'
  },

  msgTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    alignItems: "flex-start",
    fontFamily:'Inter-Black-Medium'
  },
  loginBtnContainer: {
    backgroundColor: "#E9F3FF",
  },
  loginBtn: {
    backgroundColor: "#31C2AA",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 80,
  },
  loginText: {
    color: "white",
    fontSize: 18,
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
