import React from 'react'
import {View,} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export const RenderPicker=(props)=>{
  //console.log("MAP IS: ",props.map)
  //console.log("RUNNING")
  return(
    <View
              style={props.containerStyle}
            >
              <Picker
                style={{ marginLeft: 5 }}
                itemStyle={{fontFamily:'Adam-Bold'}}
                {...props}
              >
                {props.map.length>0&&props.map?.map((item, index2) => (
                  <Picker.Item
                    label={props.chosenLabel&&props.chosenLabel.length>0?item[props.chosenLabel]:item.label}
                    value={props.chosenValue&&props.chosenValue.length>0?item[props.chosenValue]:item.value}
                    itemStyle={{fontFamily:'Adam-Bold'}}
                    key={index2}
                  />
                ))}
              </Picker>
            </View>
  )
}