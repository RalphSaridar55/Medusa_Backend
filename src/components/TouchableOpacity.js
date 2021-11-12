import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native'

export const TouchableOpacityButton = (props) =>{
    <View style={props.containerStyle}>
        <TouchableOpacity
            style={props.buttonStyle}
            onPress={props.onPress}
        >
      <Text style={props.textStyle}>{props.text}</Text>
    </TouchableOpacity>
  </View>
}
