import React from 'react';
import { TouchableOpacity,Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const TouchableDocumentPicker = (props) =>{
    return(
        <TouchableOpacity
                  {...props}
                >
                  <AntDesign name="file1" size={24} color="#6E91EC" />
                  <Text style={{ color: "gray" }}>.pdf .docx</Text>
                  {props.doc.length < 1 ? (
                    <AntDesign name="closecircle" size={24} color="red" />
                  ) : (
                    <AntDesign name="checkcircle" size={24} color="green" />
                  )}
                </TouchableOpacity>
    )
}