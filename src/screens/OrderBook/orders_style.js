import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    root: {
        // backgroundColor: "#ffffff",

    },
    mainInfo:{
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1
    },
    contentContainer:{
        flexDirection:'row'
    },
    imageContainer: {
        display:'flex',
        alignItems:'flex-start',
        height:'100%',
        marginRight:20
    },  
    container: {
        paddingRight: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#ffffff",
        marginVertical:5,
        flex:1,
        borderRadius: 10
    },
    iconContainer:{
        backgroundColor:'lightgray',
        borderRadius:20,
        height:20,
        width:20,
        justifyContent:'center',
        alignItems:'center'
    },
    iconTextContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 10,
        resizeMode: 'contain',

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
        color: "#31C2AA"
    },
    status: {
        fontSize: 12,
        color: "#698EB7"
    },
    totalContainer:{
        borderRadius: 10,
        marginVertical:20,
        marginHorizontal:10,
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
        display:'flex',
        justifyContent:'space-between',
        backgroundColor:'#fff'
    },
    total:{
        fontSize:16,
        fontWeight:'bold',
        color:'#6E91EC',
        textAlignVertical:'center'
        },
    placeOrderButton: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        padding:10
    },
    loginBtnText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
    },
});

export default styles;