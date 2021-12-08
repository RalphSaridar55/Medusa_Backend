import { StyleSheet, Dimensions } from 'react-native';

const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor:'#E9F3FF',
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
    filterContainer:{
        paddingHorizontal:20,
        paddingVertical:10,
        borderColor:'lightgray',
        borderWidth:0.8,
        marginVertical:5,
        marginBottom:20,
        backgroundColor:'#fff',
        marginHorizontal:20,
        borderRadius:5,
        justifyContent:'center'
    },
    filterText:{
        fontSize:18,
        color:'gray',
        textAlignVertical:'center',
        fontFamily:'Adam-Bold'
    },
    modalHeader:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:screenwidth,
        paddingHorizontal:20
    },
    loginBtn: {
        marginBottom:10,
        marginHorizontal:10,
        borderColor: "#31C2AA",
        borderWidth:1,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        height: 30
    },
    loginBtnText:{
        color:'#31C2AA',
        fontSize:16,
        fontFamily:'Adam-Bold'
        /* fontWeight:'bold' */
    },
    Btn: {
        backgroundColor: "#31C2AA",
        borderRadius: 25,
        width:50,
        position:'absolute',
        zIndex:99,
        bottom:10,
        left:screenwidth*0.44,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    list: {
        paddingHorizontal: 5,
        //backgroundColor: "#E9F3FF",
    },
    listContainer: {
        alignItems: 'center'
    },
    contentSize: {
        justifyContent: "space-between",
        marginHorizontal: 30,
        flexDirection: 'row',
        marginTop: 20
    },
    btnSize: {
        height: 40,
        width: 40,
        borderRadius: 40,
        borderColor: '#778899',
        borderWidth: 1,
        marginHorizontal: 3,
        backgroundColor: 'white',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceTextContainer:{
        marginVertical:10,
        marginLeft:10,
    },
    priceText:{
        fontSize:16,
        color:'#6E91EC',
        fontFamily:'Inter-Black-Light'
    },
    resetButton:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        height:40,
        marginHorizontal:screenwidth*0.25,
        borderRadius:5,
        borderColor:'#6E91EC',
    },
    resetText:{
        color:'#6E91EC',
        fontFamily:'Inter-Black-Light'
    },

    /******** card **************/
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginVertical: 5,
        backgroundColor: "white",
        flexBasis: '46%',
        marginHorizontal: 5,
    },
    cardFooter: {
        // paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 30,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    userImage: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        borderWidth: 3,
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#008080",
        fontFamily:'Adam-Bold'
    },
    position: {
        fontSize: 14,
        flex: 1,
        //alignSelf: 'center',
        color: "#696969",
        fontFamily:'Inter-Black-Light'
    },
    errorCat:{
        color:'red',
        textAlign:'center',
        paddingVertical:10,
        fontFamily:'Inter-Black-Light'
    },
    followButton: {
        marginTop: 10,
        height: 35,
        width: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    followButtonText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    icon: {
        height: 20,
        width: 20,
    },
    sortIconText:{ 
        fontSize: 14,
        color:"#6E91EC",
        fontFamily:'Adam-Light'
     }
});

export default styles;
