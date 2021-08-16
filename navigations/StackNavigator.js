import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home/home";
import About from "../screens/About/about";
import Contact from "../screens/Contact/contact";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            creenOptions={screenOptionStyle}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Contact" component={ContactStackNavigator} />
        </Stack.Navigator>
    );
}
const ContactStackNavigator = () => {
    return (
        <Stack.Navigator creenOptions={screenOptionStyle} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Contact" component={Contact} />
        </Stack.Navigator>
    );
}

export { MainStackNavigator, ContactStackNavigator };