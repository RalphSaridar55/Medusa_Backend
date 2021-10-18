import { StyleSheet, Dimensions } from 'react-native';

const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    loginBtn: {
        marginTop:40,
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
        color:'#6E91EC'
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
        color:'#6E91EC'
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
        paddingVertical: 17,
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
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    userImage: {
        height: 120,
        width: 120,
        borderRadius: 60,
        alignSelf: 'center',
        borderWidth: 3,
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#008080",
        fontWeight: 'bold'
    },
    position: {
        fontSize: 14,
        flex: 1,
        //alignSelf: 'center',
        color: "#696969"
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
    }
});

export default styles;
