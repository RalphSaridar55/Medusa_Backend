import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Cart from "../screens/Checkout/cart";
import Categories from "../screens/Categories/categories";
import Account from "../screens/Account/Account";
import Home from "../screens/Home/home";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#31C2AA', tabBarInactiveTintColor: "#698EB7" }}  >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }} />

            <Tab.Screen name="Categories" component={Categories} options={{
                tabBarLabel: 'Categories',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="view-grid-outline" color={color} size={size} />
                ),
            }} />

            <Tab.Screen name="Cart" component={Cart} options={{
                tabBarLabel: 'Cart',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="truck-fast-outline" color={color} size={size} />
                ),
            }} />

            <Tab.Screen name="Account" component={Account} options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-outline" color={color} size={size} />
                ),
            }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;

