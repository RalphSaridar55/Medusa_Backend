import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home/home";
import Contact from "../screens/Contact/contact";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from "../screens/Login/login";
import { isUserLoggedIn } from "../core/apis/APIKit";
import Categories from "../screens/Categories/categories";
import CategoiresList from "../screens/Categories/categoires_list";
import Registration from "../screens/Registeration/regsiter";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class Nav extends Component {
    authStack = () => (
        <Stack.Navigator >
            {isUserLoggedIn ? (
                <>
                        <Stack.Screen
                        name="drawerTab"
                        component={this.createDrawer}
                        options={{ headerShown: false }} />
                        </>
            ) : (
                <>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Registration"
                        component={Registration}
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack.Navigator>
    );

    createDrawer = (value) => (
        <Drawer.Navigator >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Contact" component={Contact} />
            <Drawer.Screen name="Categoires" component={Categories} />
            <Drawer.Screen name="CategoiresList" component={CategoiresList} />
        </Drawer.Navigator>
    );

    MyTabs = () => {
        return (
            <Tab.Navigator >
                <Tab.Screen name="TabHome" component={
                    Home
                    //this.createDrawer('Home')
                } options={{
                   //headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }} />
                <Tab.Screen name="TabContact" component={
                    Contact
                    //this.createDrawer('Contact')
                } options={{
                   // headerShown: false,
                    
                    }} />
            </Tab.Navigator>
        );
    }

    render() {
        return (
            <NavigationContainer>{this.authStack()}</NavigationContainer>
        );
    }
}
export default Nav;