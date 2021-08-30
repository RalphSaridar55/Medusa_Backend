// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";

// import Home from "../screens/Home/home";
// import About from "../screens/About/about";
// import Contact from "../screens/Contact/contact";
// import { LOGIN } from "../core/apis/apis-list";
// import Login from "../screens/Login/login";
// import { isUserLoggedIn } from "../core/apis/APIKit";
// import CategoiresList from "../screens/Categories/categoires_list";
// import BottomTabNavigator from "./TabNavigator";



// const Stack = createStackNavigator();

// const screenOptionStyle = {
//     headerStyle: {
//         backgroundColor: "#9AC4F8",
//     },
//     headerTintColor: "white",
//     headerBackTitle: "Back",
// };

// const MainStackNavigator = () => {
//     return (

//         <Stack.Navigator
//             creenOptions={screenOptionStyle}
//             screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Home" component={BottomTabNavigator} />
//         </Stack.Navigator>


//     );
// }
// const ContactStackNavigator = () => {
//     return (
//         <Stack.Navigator creenOptions={screenOptionStyle} screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Contact" component={Contact} />
//         </Stack.Navigator>
//     );
// }

// const AboutStackNavigator = () => {
//     return (
//         <Stack.Navigator creenOptions={screenOptionStyle} screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="About" component={About} />
//         </Stack.Navigator>
//     );
// }

// export { MainStackNavigator, ContactStackNavigator, AboutStackNavigator };
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
import BottomTabNavigator from "../navigations/TabNavigator";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

class Nav extends Component {
    loggedIn = false//this.props.user.user.isSignedIn;
    authStack = () => (
        console.log('----->', isUserLoggedIn()),
        <Stack.Navigator >
            {isUserLoggedIn ? (
                <Stack.Screen
                    name="Home"
                    component={this.createDrawer}
                    options={{ headerShown: false }}
                />

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

    createDrawer = () => (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={this.MyTabs} />
            <Drawer.Screen name="Contact" component={Contact} />
            <Drawer.Screen name="Categoires" component={Categories} />
            <Drawer.Screen name="CategoiresList" component={CategoiresList} />

        </Drawer.Navigator>
    );



    MyTabs = () => {
        return (
            <Tab.Navigator headerMode='none' >
                <Tab.Screen name="Home" component={Home} options={{
                   // headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }} />
                <Tab.Screen name="Contact" component={Contact} options={{ 
                    //headerShown: false 
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