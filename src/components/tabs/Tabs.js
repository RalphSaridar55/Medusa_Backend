import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {styles} from './TabsStyles'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const Tabs = (props) =>{
    return(
        <View style={styles.container}>
             <TouchableOpacity onPress={()=>props.loggedIn?props.navigation.navigate("Orders"):null}>
                 <Ionicons name="receipt-outline" size={24} color="black" />
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>props.loggedIn?props.navigation.navigate("Notifications",{screen:'Notification'}):null}>
                 <Ionicons name="md-notifications-outline" size={24} color="black"/>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>props.loggedIn?props.navigation.navigate("Negotiations", {screen:'NegotiationList'}):null}>
                 <FontAwesome5 name="handshake" size={24} color="black"/>
             </TouchableOpacity>
             <TouchableOpacity onPress={()=>props.loggedIn?props.navigation.navigate("Adress", { screen: "Details" }):null}>
                 <Ionicons name="settings-outline" size={24} color="black" />
             </TouchableOpacity>
        </View>
    )
}

export default Tabs