import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import footerStyle from './footerStyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Footer() {
    const navigation = useNavigation();
    let footerContent = [
        { title: 'Home', url: 'Home', iconName: 'home' },
        { title: 'Contact', url: 'Contact', iconName: 'headphones-settings' },
    ]
    const width = 100 / footerContent.length,
        footerContentView = () => {
            return (footerContent.map((element, index) => {
                return (
                    <TouchableOpacity key={index} style={{ ...footerStyle.rowView, ...{ width: width.toString() + '%' } }}
                    onPress={() => navigation.navigate(element.url)} >
                         <MaterialCommunityIcons name={element.iconName} size={20} color={'#76cfaa'} />
                        <Text style={footerStyle.textStyle}>{element.title}</Text>
                    </TouchableOpacity>
                )
            })
            )

        }

    return (
        <View style={footerStyle.container}>
            {footerContentView()}
        </View>
    )
}