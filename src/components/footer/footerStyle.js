import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding:10,
        backgroundColor: '#F5F5F5',
        flexDirection: 'row',
        height: '7%',
        justifyContent:'space-between',
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: '#000000',
        elevation: 4,
    },
    leftContainer:{
        flex:3
    },
    rightContainer:{
        flex:2
    },
    footerHeader:{
        textAlign:'center',
        fontFamily:'Adam-Bold',
        fontSize:20,
        paddingBottom:20
    },
    description:{
        fontSize:14,
        fontFamily:'Inter-Black-Light'
    },
    iconsContainer:{
        flex:2,
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row'
    },
    rowView: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    textStyle: {
        fontWeight: '700'
    }
});