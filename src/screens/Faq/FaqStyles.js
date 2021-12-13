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
        fontSize:20,
        fontFamily:'Adam-Bold'
    },
    answer:{
        fontSize:14,
        fontFamily:'Inter-Black-Light',
        paddingBottom:10
    }
})