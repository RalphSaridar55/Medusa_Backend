import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Loyalty from '../screens/Loyalty/Loyalty';
import Buy from "../screens/Loyalty/Buy";

const LStack = createStackNavigator();

const LoyaltyStack = ({ navigation, route }) => {
  return (
    <LStack.Navigator>
        <LStack.Screen
        name="Loyalty"
        component={Loyalty}
        options={{ headerShown: false }}
        navigation={navigation}
        />
        <LStack.Screen
        name="Buy"
        component={Buy}
        options={{ headerShown: false }}
        navigation={navigation}
        />
    </LStack.Navigator>
  );
};

export default LoyaltyStack;