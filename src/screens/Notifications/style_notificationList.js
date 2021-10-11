import { StyleSheet,Dimensions } from "react-native";

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export const styles = StyleSheet.create({
    chatsContainer:{
    },
    containerChat:{
        marginVertical:10,
        paddingHorizontal:20,
        borderBottomColor:'lightgray',
        paddingBottom:20,
        borderBottomWidth:1
    },
    adminImage:{
    },
    pictureAndUsernameContainer:{
        display:'flex',
        flexDirection:'row',
        marginBottom:10
    },
    name:{
        position:'absolute',
        left:15,
        top:10,
        zIndex:99,
        color:'#fff',
    },
    dateContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-end',
        flex:1
    },
    readButton:{
        marginVertical:5,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        paddingHorizontal:20,
    },
    date:{
        color:'gray',
        textAlignVertical:'center'
    },
    pictureContainer:{
        borderRadius:25,
        width:50,
        height:50,
        color:'#fff',
        marginRight:20

    },
    username:{
        fontSize:20,
        textAlignVertical:'center'
    },
    chatSubject:{
        fontSize:16,
        marginTop:5,
        fontWeight:'bold',
    },
    chatText:{
        color:'gray',
        marginTop:5,
    }
})