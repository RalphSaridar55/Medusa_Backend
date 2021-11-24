import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native'

export const TouchableOpacityOutlined = (props) =>{
    return <View style={[{...props.additionalContainerStyle}]}>
        <TouchableOpacity
            style={[styles.button,{...props.additionalButtonStyle}]}
            onPress={props.onPress}
        >
      <Text style={[styles.text,{...props.additionalTextStyle}]}>{props.text}</Text>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
    button: {
        marginBottom:10,
        marginHorizontal:10,
        borderColor: "#31C2AA",
        borderWidth:1,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        height: 30
    },
    text:{
        color:'#31C2AA',
        fontSize:16,
        /* fontWeight:'bold' */
    },
})
