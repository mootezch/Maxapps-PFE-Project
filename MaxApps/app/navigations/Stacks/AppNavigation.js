// AppNavigation.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "../Bottontabs/Tabs";
import LoginScreen from "../../screens/LoginScreen";
import NotificationsTab from "../Bottontabs/NotificationsTab";
import ProfileTab from "../Bottontabs/ProfileTab";
import SendTicket from "../../screens/SendTicket";
import HomeTab from "../Bottontabs/HomeTab";
import SignUpScreen from "../../screens/SignUpScreen";
import TicketsScreen from "../../screens/TicketsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="SendTicket" component={SendTicket} />
        <Stack.Screen name="TicketsScreen" component={TicketsScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

const TabsNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeTab}  />
      <Tab.Screen name="Settings" component={SettingsTab} />
      <Tab.Screen name="Notifications" component={NotificationsTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />

    </Tab.Navigator>
  );
};

export default AppNavigation;
