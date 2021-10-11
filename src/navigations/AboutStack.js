import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import About from "../screens/About/about";
import Contact from "../screens/Contact/contact";

const AStack = createStackNavigator();

const AboutStack = ({ navigation, route }) => {
  return (
    <AStack.Navigator>
      <AStack.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <AStack.Screen
        name="Contact"
        component={Contact}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </AStack.Navigator>
  );
};

export default AboutStack;
