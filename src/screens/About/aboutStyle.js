import { StyleSheet,Dimensions } from 'react-native';

const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;

export default StyleSheet.create({
    scrollview:{
    
    },
    descritpion:{
        color:'gray'
    },
    Bcontainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    B_container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10
    },
    container: {
        backgroundColor: "#e9f3ff",
        flex: 1,
        paddingHorizontal: 10,
        paddingTop:10,
    },
    header: {
        height: 50,
        backgroundColor: "#698eb7"
    },
    headLine: {
        marginHorizontal:10,
        marginBottom: 10,
        color: "#698EB7",
        fontWeight: "bold"
    },
    img: {
        width:screenwidth-20,
        height:300,
        borderRadius:10,
        flex:1
    },
    Title: {
        fontSize: 18,
    },
    avatarbg: {
        backgroundColor: "#31c2aa",
        borderRadius: 10,
    },
    surface: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
    textContainer:{
        // backgroundColor: "red"
        backgroundColor:'#fff',
        paddingHorizontal:10,
        paddingVertical:20,
        // borderRadius:10
    },
    title:{
        color: "#698eb7",
        paddingBottom:20,
        fontSize:18,
        fontWeight:'bold'
    }
});
 