import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Campaign from "../screens/Campaign/Campaign";
import Create from '../screens/Campaign/Create';
import Detailed from "../screens/Campaign/Detailed_campaign";

const CStack = createStackNavigator();

const CampaignStack = ({ navigation, route }) => {
  return (
    <CStack.Navigator>
        <CStack.Screen
        name="CampaignChoice"
        component={Campaign}
        options={{ headerShown: false }}
        navigation={navigation}
        />
        <CStack.Screen
        name="CampaignDetailed"
        component={Detailed}
        options={{ headerShown: false }}
        navigation={navigation}
        />
        <CStack.Screen
        name="Create"
        component={Create}
        options={{ headerShown: false }}
        navigation={navigation}
        />
    </CStack.Navigator>
  );
};

export default CampaignStack;