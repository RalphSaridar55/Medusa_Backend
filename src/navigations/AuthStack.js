import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Registration from "../screens/Registeration/registration";
import Login from '../screens/Login/login';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword'

const AStack = createStackNavigator();

const ProductStack = ({ navigation, route }) => {
  return (
    <AStack.Navigator>
        <AStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
        navigation={navigation}
        />
      <AStack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <AStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </AStack.Navigator>
  );
};

export default ProductStack;
