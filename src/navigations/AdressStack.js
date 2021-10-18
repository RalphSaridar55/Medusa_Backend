import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AdressList from "../screens/BuyerAccountDetails/addresses_list";
import BuyerAccountDetails from "../screens/BuyerAccountDetails/buyer_account_details";
import Addresses from "../screens/BuyerAccountDetails/addresses";
import SellingDetail from "../screens/BuyerAccountDetails/sellingDetails";
import DetailedProduct from "../screens/BuyerAccountDetails/detailedProduct";
import AddVariant from "../screens/BuyerAccountDetails/addVariant";

const AStack = createStackNavigator();
const PStack = createStackNavigator();

const ProductStack = ({navigation}) => {
  return(
  <PStack.Navigator>
      <PStack.Screen
        name="SellingDetails"
        component={SellingDetail}
        options={{ headerShown: false }}
        navigation={navigation}
        />
      <PStack.Screen
        name="DetailedProduct"
        component={DetailedProduct}
        options={{ headerShown: false }}
        navigation={navigation}
        />
      <PStack.Screen
        name="AddVariant"
        component={AddVariant}
        options={{ headerShown: false }}
        navigation={navigation}
        />
  </PStack.Navigator>
  )
}

const AdressStack = ({ navigation, route }) => {
  return (
    <AStack.Navigator>
      <AStack.Screen
        name="List"
        component={AdressList}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <AStack.Screen
        name="Addresses"
        component={Addresses}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <AStack.Screen
        name="Details"
        component={BuyerAccountDetails}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <AStack.Screen
        name="Selling"
        component={ProductStack}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </AStack.Navigator>
  );
};

export default AdressStack;
