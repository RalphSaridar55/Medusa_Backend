import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home/home";
import About from "../screens/About/about";
import Contact from "../screens/Contact/contact";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from "../screens/Login/login";
import { isUserLoggedIn } from "../core/apis/APIKit";
import Categories from "../screens/Categories/categories";
import CategoiresList from "../screens/Categories/categoires_list";
import Registration from "../screens/Registeration/regsiter";
import { NavigationContainer } from "@react-navigation/native";
import Reserved from "../screens/OrderBook/Reserved_Orders"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signup from '../screens/Registeration/signup';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class Nav extends Component {
    loggedIn = false//this.props.user.user.isSignedIn;
    authStack = () => (
        console.log('----->', isUserLoggedIn()),
        <Stack.Navigator >
            {!isUserLoggedIn ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={this.createDrawer}
                        options={{ headerShown: false }}
                    />
                    
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
                        component={Signup}
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack.Navigator>
    );

    createDrawer = () => (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={this.MyTabs} />
            <Drawer.Screen name ="Signup" component ={Signup}/>
            <Drawer.Screen name="Contact" component={Contact} />
            <Drawer.Screen name="Categoires" component={Categories} />
            <Drawer.Screen name="CategoiresList" component={CategoiresList} />
            <Drawer.Screen name="Reserved" component={Reserved}/>
        </Drawer.Navigator>
    );



    MyTabs = () => {
        return (
            <Tab.Navigator headerMode='none' >
                <Tab.Screen name="Home" component={Home} options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }} />
                <Tab.Screen name="Contact" component={Contact} options={{
                    headerShown: false 
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