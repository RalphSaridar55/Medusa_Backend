import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Orders from '../screens/OrderBook/orders';
import ReservedOrders from '../screens/OrderBook/Reserved_Orders';
import Value from '../screens/OrderBook/valueadded';

const OStack = createStackNavigator();

const ProductStack = ({ navigation, route }) => {
  return (
    <OStack.Navigator>
        <OStack.Screen
        name="OrderList"
        component={Orders}
        options={{ headerShown: false }}
        navigation={navigation}
        />
      <OStack.Screen
        name="ReservedOrders"
        component={ReservedOrders}
        options={{ headerShown: false }}
        navigation={navigation}
      />
      <OStack.Screen
        name="ValueAdded"
        component={Value}
        options={{ headerShown: false }}
        navigation={navigation}
      />
    </OStack.Navigator>
  );
};

export default ProductStack;
