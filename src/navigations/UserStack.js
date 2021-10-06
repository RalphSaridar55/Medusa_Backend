import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import create from "../screens/Users/create";
import list from "../screens/Users/list";
import edit from "../screens/Users/edit";

const UStack = createStackNavigator();

const UserStack = ({navigation,route}) => {
  return (
    <UStack.Navigator>
      <UStack.Screen
        name="UserList"
        component={list}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <UStack.Screen
        name="UserEdit"
        component={edit}
        options={{ headerShown: false }}
        navigation={navigation}
        route={route}
        test="123"
      />
      <UStack.Screen
        name="UserCreate"
        component={create}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </UStack.Navigator>
  );
};

export default UserStack;
