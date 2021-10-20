import { StyleSheet , Dimensions} from "react-native";


export const styles = StyleSheet.create({
    progressBarContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:20
    },
    container: {
      margin: 50,
    },
    selectedDateContainerStyle: {
      height: 35,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#6E91EC",
    },
    selectedDateStyle: {
      fontWeight: "bold",
      color: "white",
    },
    headerText:{
        fontSize: 21,
        color: "#6E91EC",
        fontWeight: 'bold',
        marginBottom: 5
    },
    imgContainer: {
        flex: 1,
        backgroundColor:'#E9F3FF'
    },
    smallImages:{
        width:100,
        height:100,
        marginHorizontal:10
    },
    Btn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        width:50,
        zIndex:99,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    document:{
        marginHorizontal:20,
        backgroundColor:'#fff',
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
    closeIconContainer:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'flex-end',
        zIndex:99
    },
    docPicker:{
        flex:1,
        borderWidth:1,
        borderRadius:5,
        borderColor:'gray',
        marginVertical:10,
        height:55,
        display:'flex',
        flexDirection:'row',
        //justifyContent:'space-between',
        paddingHorizontal:10,
        //alignItems:'center'
    },
    loginBtn: {
        marginVertical:20,
        marginHorizontal:40,
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        height: 50
    },
    loginBtnText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
    switchContainer:{
        marginVertical:10,
        borderRadius:5,
        marginHorizontal:20,
        backgroundColor:'#fff',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:60,
        paddingHorizontal:10
    },
    switchText:{
        color:'gray',
        fontSize:16
    }
})
