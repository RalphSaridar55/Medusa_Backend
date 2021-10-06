import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import ProductList from '../screens/Products/product_list';
import ProductDetails from '../screens/Products/product_details';
import ProductAdd from '../screens/Products/product_add';
import AddProduct from '../screens/Products/product_add';

const PStack = createStackNavigator();

const ProductStack = ({navigation,route}) => {
    return (
      <PStack.Navigator>
        <PStack.Screen
          name="List"
          component={ProductList}
          options={{ headerShown: false }}
          navigation={navigation}
        />
        <PStack.Screen
          name="Detailed"
          component={ProductDetails}
          options={{ headerShown: false }}
          navigation={navigation}
        />
        <PStack.Screen
          name="Add"
          component={AddProduct}
          options={{ headerShown: false }}
          navigation={navigation}
        />
      </PStack.Navigator>
    );
  };
  
  export default ProductStack;
  