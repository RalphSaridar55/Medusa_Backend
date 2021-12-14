import React, {useCallback} from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import footerStyle from './footerStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons'; 

export default function Footer(props) {

    

        const handlePress = async(url) => {
            await Linking.openURL(url)
        }

    return (
        <View style={footerStyle.container}>
            <View  style={footerStyle.leftContainer}>
                <Text 
                style={footerStyle.linkText}
                onPress={()=>{
                    props.closeOrOpen(true)
                    props.changeOverlay("disclaimer")
                }}>Disclaimer</Text>
                <Text 
                style={footerStyle.linkText}
                onPress={()=>{
                    props.closeOrOpen(true)
                    props.changeOverlay("conditions")
                }}>Conditions and Terms</Text>
            </View>
            <View style={footerStyle.rightContainer}>
                <Text style={footerStyle.footerHeader}>Social Media</Text>
                <View style={footerStyle.iconsContainer}>
                    <AntDesign name="instagram" size={24} color="#6E91EC" onPress={()=>handlePress("https://www.instagram.com")}/>
                    <AntDesign name="facebook-square" size={24} color="#6E91EC"  onPress={()=>handlePress("https://www.facebook.com")}/>
                    <AntDesign name="twitter" size={24} color="#6E91EC"  onPress={()=>handlePress("https://www.twitter.com")}/>
                </View>
            </View>
        </View>
    )
}