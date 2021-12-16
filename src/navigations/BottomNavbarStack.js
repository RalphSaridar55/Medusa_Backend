import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home/home'
import Addresses from '../screens/BuyerAccountDetails/buyer_account_details';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const TabBottomStack = createStackNavigator();

function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={24} color="black" />
          ),
        }} />
      <Tab.Screen name="Settings" component={Addresses}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={24} color="black" />
          ),
        }}  />
    </Tab.Navigator>
  );
}

const StackBottom = () =>{
    return(
        <NavigationContainer>
            <BottomTab />
        </NavigationContainer>
    )
}


// export default BottomTab
export default BottomTab