import React, { Component } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home/home";
import Contact from "../screens/Contact/contact";
import Login from "../screens/Login/login";
import Categories from "../screens/Categories/categories";
import CategoiresList from "../screens/Categories/categoires_list";
import { NavigationContainer } from "@react-navigation/native";
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword'
import * as apiServices from "../core/apis/apiUserServices"
import Registartion from '../screens/Registeration/registration';

//
import Products from '../screens/Products/product_list.js';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class Nav extends Component {
    authStack = () => (
        <Stack.Navigator >
            {!apiServices.isUserLoggedIn? (
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
                        component={Products}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Registration"
                        component={Registartion}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPassword}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="initialHome"
                        component={this.createDrawer}
                        options={{ headerShown: false }} />
                </>
            )}
        </Stack.Navigator>
    );

    createDrawer = () => (
        <Drawer.Navigator >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Contact" component={Contact} />
            <Drawer.Screen name="Categoires" component={Categories} />
            <Drawer.Screen name="CategoiresList" component={CategoiresList} />
        </Drawer.Navigator>
    );

    render() {
        return (
            <NavigationContainer>{this.authStack()}</NavigationContainer>
        );
    }
}
export default Nav;