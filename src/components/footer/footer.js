import React, {useCallback} from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import footerStyle from './footerStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons'; 

export default function Footer() {

    

        const handlePress = async(url) => {
            await Linking.openURL(url)
        }

    return (
        <View style={footerStyle.container}>
            <View  style={footerStyle.leftContainer}>
                <Text style={[footerStyle.footerHeader,{textAlign:'left'}]}>Disclaimer</Text>
                <View>
                    <Text style={[footerStyle.description,{width:200}]}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    </Text>
                </View>
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