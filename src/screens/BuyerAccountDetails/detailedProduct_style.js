import { StyleSheet,Dimensions } from "react-native";

const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
    image: {
        width: screenwidth,
        height: screenheight*0.3,
    },
    BtnContainer:{
        display:'flex',
        justifyContent:'center',
        flex:1,
        alignItems:'center',
        marginTop:5
    },
    Btn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        width:50,
        zIndex:99,
        bottom:10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    twoInfoBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:20,
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
        padding:20,
        flexDirection:'column',
    },
    name: {
        fontSize: 24,
        color:'#698EB7',
        fontFamily:'Adam-Bold'
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
        marginTop:20,
        marginHorizontal:10,
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        padding:20,
        flex:1,
        height: 50
    },
    loginBtnText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
    textInfo:{
        fontFamily:'Inter-Black-Light',
        flexWrap:'wrap'
    }
})