import { StyleSheet,Dimensions } from "react-native";

const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
    image: {
        width: screenwidth,
        height: screenheight*0.3,
        resizeMode:'stretch'
    },
    detailKey:{
        fontWeight:'bold',
        color:'gray'
    },
    buttonContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around',
        paddingHorizontal:20,
    },
    picker:{
              borderWidth: 1,
              borderColor: "#C4C4C4",
              borderRadius: 4,
              marginVertical: 10,
              height:40,
             // marginHorizontal:50,
              justifyContent:'center',
             //backgroundColor:'#fff'
    },
    modalHeader:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:screenwidth,
        paddingHorizontal:20
    },
    modalBoxInputs:{
        borderWidth:0.5,
        borderColor:'#31c2aa',
        borderRadius:10,
        width:screenwidth*0.7,
        paddingHorizontal:10,
        paddingVertical:10,
        marginVertical:5
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:20
    },
    docPicker:{
        borderWidth:1,
        borderRadius:5,
        borderColor:'gray',
        marginVertical:10,
        flex:1,
        height:55,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        alignItems:'center'
    },
    mainContainer:{
        paddingHorizontal:20,
        flexDirection:'column',
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        color:'#698EB7'
    },
    priceContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:20,
    },
    buttonsContainer:{
        /* position:'absolute',
        bottom:0, */
        marginHorizontal:20,
        marginVertical:10,
        flex:1,
        display:'flex',
        /* backgroundColor:'red', */
        justifyContent:'flex-end',
        flexDirection:'row',
        alignItems:'flex-end'
    },
    loginBtn: {
        marginTop:10,
        marginHorizontal:50,
        backgroundColor: "#5BC5B9",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        padding:20,
        flex:1,
        height: 40
    },
    loginBtnText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
})