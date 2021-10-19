import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from'react-native'
import NotificationList from '../screens/Notifications/NotificationList';
import Notification from '../screens/Notifications/Notification';

const NOStack = createStackNavigator();

const Test = () =>{
  return(
    <View>
      <Text>Test</Text>
    </View>
  )
}

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