import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'#E9F3FF'
    },
    elementContainer:{
        display:'flex',
        flexDirection:'row',
        flex:1,
        borderBottomColor:'white',
        borderBottomWidth:1
    },
    child:{
        marginHorizontal:20,
        marginVertical:20,
        display:'flex',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    left:{
      display:'flex',
      flexDirection:'row'  
    },
    iconContainer:{
        alignItems:'center',
        justifyContent:'center',
        marginRight:20
    },
    username:{
        fontSize:18
    },
    action:{
        fontSize:12
    },
    date:{
        color:'gray'
    }
})