import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
  },

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
    justifyContent:'space-between'
  
  },
  nameTxt: {
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
  },
  mblTxt: {
    fontWeight: "200",
    color: "#777",
    fontSize: 13,
    alignItems:"flex-end"
  },

  msgTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    alignItems:"flex-start"
  
  },
  loginBtnContainer: {
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
    fontSize: 18,
  },
});

export default styles;
