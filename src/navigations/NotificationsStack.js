import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import NotificationList from '../screens/Notifications/NotificationList';
import Notification from '../screens/Notifications/Notification';

const NOStack = createStackNavigator();

const NotificationStack = ({ navigation, route }) => {
    return (
      <NOStack.Navigator>
        <NOStack.Screen
          name="Notification"
          component={NotificationList}
          options={{ headerShown: false }}
          navigation={navigation}
        />
        <NOStack.Screen
          name="NotificationChat"
          component={Notification}
          options={{ headerShown: false }}
          navigation={navigation}
        />
      </NOStack.Navigator>
    );
}

export default NotificationStack