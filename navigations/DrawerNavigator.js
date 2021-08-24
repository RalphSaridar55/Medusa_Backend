import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator, AboutStackNavigator } from "./StackNavigator";
import BottomTabNavigator from "./TabNavigator"
import Login from "../screens/Login/login";
import Registration from "../screens/Registeration/regsiter"
import ResetPassword from "../screens/ResetPassword/ResetPassword";
import About from "../screens/About/about";
import Contact from "../screens/Contact/contact";
import Home from "../screens/Home/home";

import Cart from "../screens/Checkout/cart";
import Categories from "../screens/Categories/categories";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="ResetPasswordScreen" component={ResetPassword} />
            <Drawer.Screen name="Registration" component={Registration} />
            <Drawer.Screen name="Contact" component={Cart} />
            <Drawer.Screen name="Categoires" component={Categories} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;