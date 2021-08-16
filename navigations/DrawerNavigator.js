import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator } from "./StackNavigator";
import BottomTabNavigator from "./TabNavigator"

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={BottomTabNavigator} />
            <Drawer.Screen name="About" component={BottomTabNavigator}/>
            <Drawer.Screen name="Contact" component={BottomTabNavigator} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;