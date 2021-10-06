import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    listContainer:{
        display:'flex',
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#D3D3D3',
        marginBottom:10,
        backgroundColor:'#fff',
        padding:20,
        borderRadius:20,
    },
    listIcon:{
        marginRight:20,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    listCountry:{
        width:150,
        fontSize:20,
        flex:1,
    },
    listCity:{
    },
    listStreet:{
        width:150,
        color:'gray'
    },
    rightContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-around'
        /* 
        alignItems:'flex-end',
        justifyContent:'flex-end' */
    },
    postalContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-end',
        paddingHorizontal:15
    },
    iconsContainer:{
        display:'flex',
        flexDirection:'row',
        marginLeft:80,
        paddingRight:10,
        alignItems:'flex-end',
        justifyContent:'flex-end'
    },
    Btn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
        marginHorizontal:100
    },
    textButton:{
        fontSize:18,
        color:'white',
    },
})

export default styles;