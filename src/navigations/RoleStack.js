import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Create from '../screens/Roles/create';
import Roles from '../screens/Roles/roles';
import Edit from '../screens/Roles/edit';

const RSTack = createStackNavigator();

const RoleStack = ({navigation,route}) => {
    return (
      <RSTack.Navigator>
        <RSTack.Screen
          name="Create"
          component={Create}
          options={{ headerShown: false }}
          navigation={navigation}
        />
        <RSTack.Screen
          name="Roles"
          component={Roles}
          options={{ headerShown: false }}
          navigation={navigation}
        />
        <RSTack.Screen
          name="Edit"
          component={Edit}
          options={{ headerShown: false }}
          navigation={navigation}
        />
      </RSTack.Navigator>
    );
  };
  
  export default RoleStack;
  