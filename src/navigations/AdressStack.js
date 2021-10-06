import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AdressList from "../screens/BuyerAccountDetails/addresses_list";
import BuyerAccountDetails from "../screens/BuyerAccountDetails/buyer_account_details";
import Addresses from "../screens/BuyerAccountDetails/addresses";

const PStack = createStackNavigator();

const ProductStack = ({ navigation, route }) => {
  return (
    <PStack.Navigator>
      <PStack.Screen
        name="List"
        component={AdressList}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <PStack.Screen
        name="Addresses"
        component={Addresses}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <PStack.Screen
        name="Details"
        component={BuyerAccountDetails}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </PStack.Navigator>
  );
};

export default ProductStack;
