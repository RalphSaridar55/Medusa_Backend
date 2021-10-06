/* import React from 'react';
import {Alert} from 
export default submit =()=>{
    return 
} */

import { Alert } from "react-native";

export function SubmitData(payload){
    console.log("PAYLOAD FROM SUBMIT: ",payload)
    for(var key of Object.keys(payload)){
        console.log(key +" --> "+payload[key]);
        console.log(typeof(payload[key]));
        switch(typeof(payload[key])){
            case 'string':
                if(payload[key].length<1){
                    Alert.alert("Error",`Please fill the required field: ${key.replace("_"," ")}`)
                    return;
                }
            case 'number':
                if(payload[key]==0){
                    Alert.alert("Error",`${key.replace("_"," ")}'s input must be a positive number`)
                    return;
                }
        }
    }
}