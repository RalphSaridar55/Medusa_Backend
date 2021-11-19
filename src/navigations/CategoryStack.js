import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Categories from "../screens/Categories/categories";

const CStack = createStackNavigator();

const CategoriesStack = ({ navigation, route }) => {
  return (
    <CStack.Navigator>
        <CStack.Screen
        name="Categories"
        component={Categories}
        options={{ headerShown: false }}
        navigation={navigation}
        />
    </CStack.Navigator>
  );
};

export default CategoriesStack;