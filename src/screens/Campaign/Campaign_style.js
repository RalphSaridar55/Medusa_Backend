import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor:'#fff',
        borderWidth:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'lightgray',
        marginVertical: 20,
        paddingVertical:40,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    },
    header: {
      fontSize: 21,
      color: "#6E91EC",
      fontWeight: 'bold',
      marginBottom: 5
    },
    infoContainer:{
        display:'flex',
        justifyContent:'flex-start',
        marginVertical:20
    },
    bannerTitle:{
        fontSize:24
    },
    bannerInfo:{
        fontSize:12,
        color:'gray'
    },
    bannerPrice:{
        marginTop:20,
        fontSize:16,
        color:'#31C2AA'
    }
}) 