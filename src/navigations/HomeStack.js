import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home/home";

const HStack = createStackNavigator();

const ProductStack = ({ navigation, route }) => {
  return (
    <HStack.Navigator>
      
      <HStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </HStack.Navigator>
  );
};

export default ProductStack;
