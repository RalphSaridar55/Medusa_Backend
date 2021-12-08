import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native'

export const TouchableOpacityButton = (props) =>{
    return <View style={[styles.container,{...props.additionalContainerStyle}]}>
        <TouchableOpacity
            style={[styles.button,{...props.additionalButtonStyle}]}
            onPress={props.onPress}
        >
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  container:{
    paddingVertical:10
  },
  button:{
   backgroundColor: "#31C2AA",
   borderRadius: 25,
   height: 40,
   alignItems: "center",
   justifyContent: "center",
   marginHorizontal: 70,
  },
  text:{
   color: "white",
   fontSize: 18,
   fontWeight:'600',
   fontFamily:'Adam-Bold'
  }
})
