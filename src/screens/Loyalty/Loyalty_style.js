import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('screen').width

export const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    color: "#6E91EC",
    fontFamily:'Adam-Bold',
    marginVertical:10,
    marginTop:20,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical:5,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  modalHeader:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      width:screenWidth,
      paddingHorizontal:20
  },
  modalBoxInputs:{
      borderWidth:0.5,
      borderColor:'#31c2aa',
      borderRadius:10,
      width:screenWidth*0.7,
      paddingHorizontal:10,
      paddingVertical:10,
      marginVertical:5
  },
  loginBtn: {
    flex:1,
    paddingHorizontal:5,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#31C2AA",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  loginBtnText: {
    color: "white",
    fontSize: 18,
    fontFamily:'Adam-Bold'
  },
  cardHistory: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
  },
});
