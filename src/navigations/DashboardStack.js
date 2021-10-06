import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../screens/Dashboard/Dashboard";

const DStack = createStackNavigator();

const DashboardStack = ({ navigation, route }) => {
  return (
    <DStack.Navigator>
      <DStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </DStack.Navigator>
  );
};

export default DashboardStack;
