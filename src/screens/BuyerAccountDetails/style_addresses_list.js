import { StyleSheet } from "react-native";
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D3D3D3",
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    justifyContent: "space-between",
  },
  listIcon: {
    marginRight: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  listCountry: {
    fontSize: 18,
    flex: 1,
   
  },
  
  Container:{
    display: "flex",
    flexDirection: "row",
  },
  leftContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: responsiveWidth(50),
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
  Btn: {
    backgroundColor: "#31C2AA",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 100,
  },
  textButton: {
    fontSize: 18,
    color: "white",
  },
});

export default styles;
