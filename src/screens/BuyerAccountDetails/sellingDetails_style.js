import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    // backgroundColor: "#ffffff",
  },
  mainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  loginBtn: {
      marginVertical:20,
      marginHorizontal:20,
      position:'relative',
      bottom:0,
      backgroundColor: "#31C2AA",
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      height: 50
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
      alignItems:'center'
  },
  contentContainer: {
    flexDirection: "row",
  },
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor: "white",
    flexBasis: "46%",
    marginHorizontal: 5,
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage: {
    height: 120,
    width: 120,
    alignSelf: "center",
    borderWidth: 3,
  },
  position: {
    fontSize: 14,
    flex: 1,
    //alignSelf: 'center',
    color: "#696969",
  },
  imageContainer: {
    display: "flex",
    alignItems: "flex-start",
    height: "100%",
    marginRight: 20,
  },
  container: {
    paddingRight: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginVertical: 5,
    flex: 1,
    borderRadius: 10,
  },
  iconContainer: {
    backgroundColor: "lightgray",
    borderRadius: 20,
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
    resizeMode: "contain",
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  time: {
    fontSize: 10,
    color: "#31C2AA",
  },
  status: {
    fontSize: 12,
    color: "#698EB7",
  },
  totalContainer: {
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6E91EC",
    textAlignVertical: "center",
  },
  list: {
    paddingHorizontal: 5,
    //backgroundColor: "#E9F3FF",
  },
  listContainer: {
    alignItems: "center",
  },
  placeOrderButton: {
    backgroundColor: "#31C2AA",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  loginBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
