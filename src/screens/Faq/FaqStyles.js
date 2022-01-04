import { StyleSheet, Dimensions } from 'react-native';

const screenwidth = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
    imageBkg: {
        flex: 1,
    },    
    img: {
        width:screenwidth,
        height:300,
    },
    container:{
    },
    wrapperStyle:{
        backgroundColor:'#fff',
        paddingHorizontal:10,
        borderBottomWidth:0.4,
        borderColor:'lightgray'
    },
    question:{
        fontSize:16,
        fontFamily:'Inter-Black-Medium'
    },
    answer:{
        fontSize:14,
        fontFamily:'Inter-Black-Light',
        paddingBottom:10
    },
    searchBar:{
        borderColor:'lightgray',
        borderBottomWidth:1,
        marginHorizontal:10,
        marginVertical:30,
        paddingHorizontal:20,
        paddingVertical:5,
        display:"flex",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    search:{
        flex:1
    }
})