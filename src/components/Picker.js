import {View,} from 'react-native';
import {Picker} from '@react-native-picker/picker';

export const RenderPicker=(props)=>{
  return(
    <View
              style={{
                borderWidth: 1,
                borderColor: "#C4C4C4",
                borderRadius: 4,
                marginVertical: 10,
                height: 55,
                justifyContent: "center",
                backgroundColor: "#fff",
              }}
            >
              <Picker
                style={{ marginLeft: 5 }}
                {...props}
              >
                {/* <Picker.Item label="Registered Address" value={0}/> */}
                {props.map.length>0&&props.map?.map((item, index2) => (
                  <Picker.Item
                    label={item.label}
                    value={item.value}
                    key={index2}
                  />
                ))}
              </Picker>
            </View>
  )
}