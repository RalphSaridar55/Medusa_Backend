/* import React from 'react';
import {Alert} from 
export default submit =()=>{
    return 
} */

import { Alert } from "react-native";

export function SubmitData(payload){
    console.log("PAYLOAD FROM SUBMIT: ",payload.return_allowed)
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
                switch(key){
                    case 'return_day':
                        if(payload.return_allowed){
                            console.log("THE TRUE VALUE IS: ",payload.return_allowed)
                            if(payload[key]==0){
                                Alert.alert("Error",`${key.replace("_"," ")}'s input must be a positive number`)
                                return;
                            }
                        } 
                    case 'cancel_day':
                        if(payload.cancel_allowed){
                            if(payload[key]==0){
                                Alert.alert("Error",`${key.replace("_"," ")}'s input must be a positive number`)
                                return;
                            }
                        } 
                    case 'discount':
                        if(payload.is_discount){
                            if(payload[key]==0){
                                Alert.alert("Error",`${key.replace("_"," ")}'s input must be a positive number`)
                                return;
                            }
                        } 
                    case 'variant_by_piece':
                        if(payload.is_variant_by_piece){
                            if(payload[key]==0){
                                Alert.alert("Error",`${key.replace("_"," ")}'s input must be a positive number`)
                                return;
                            }
                        } 
                    case 'variant_by_package':
                        if(payload.is_variant_by_package){
                            if(payload[key]==0){
                                Alert.alert("Error",`${key.replace("_"," ")}'s input must be a positive number`)
                                return;
                            }
                        } 
                    case 'variant_min_qty':
                        if(payload.is_variant_min_qty){
                            if(payload[key]==0){
                                Alert.alert("Error",`${key.replace("_"," ")}'s input must be a positive number`)
                                return;
                            }
                        } 
                    case 'variant_stock':
                        if(payload.is_variant_stock){
                            if(payload[key]==0){
                                Alert.alert("Error",`${key.replace("_"," ")}'s input must be a positive number`)
                                return;
                            }
                        } 
                    default:
                        if(payload[key]==0){
                            Alert.alert("Error",`${key.replace("_"," ")}'s input must be a positive number`)
                            return;
                        }
                }
        }
    }
}