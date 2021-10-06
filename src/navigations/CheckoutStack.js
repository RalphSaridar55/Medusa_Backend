import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Cart from '../screens/Checkout/cart';
import Checkout from '../screens/Checkout/checkout';
import Delivery from '../screens/Checkout/Delivery';
import Pickup from '../screens/Checkout/Pickup';

const CStack = createStackNavigator();

const ProductStack = ({navigation,route}) => {
    return (
      <CStack.Navigator>
        <CStack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
          navigation={navigation}
        />
        <CStack.Screen
          name="Checkout"
          component={Checkout}
          options={{ headerShown: false }}
          navigation={navigation}
        />
        <CStack.Screen
          name="Delivery"
          component={Delivery}
          options={{ headerShown: false }}
          navigation={navigation}
        />
        <CStack.Screen
          name="Pickup"
          component={Pickup}
          options={{ headerShown: false }}
          navigation={navigation}
        />
      </CStack.Navigator>
    );
  };
  
  export default ProductStack;
  