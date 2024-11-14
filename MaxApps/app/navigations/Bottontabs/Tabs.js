import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import HomeTab from "./HomeTab";
import MessagesTab from "./SettingsTab";
import NotificationsTab from "./NotificationsTab";
import ProfileTab from "./ProfileTab";
import IMAGES from "./images";
import colors from "../../constants/colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: colors.azreg,
        tabBarInactiveTintColor: colors.black,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          headerShown : false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={IMAGES.Home}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? colors.azreg : colors.black,
              }}
            />
          ),

          tabBarActiveTintColor: colors.azreg,
          tabBarInactiveTintColor: colors.black,
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationsTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={IMAGES.NOTIFICATIONS}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? colors.azreg : colors.black,
              }}
            />
          ),
          tabBarActiveTintColor: colors.azreg,
          tabBarInactiveTintColor: colors.black,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={MessagesTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={IMAGES.SETTINGS}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? colors.azreg : colors.black,
              }}
            />
          ),
          tabBarActiveTintColor: colors.azreg,
          tabBarInactiveTintColor: colors.black,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={IMAGES.PROFILE}
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? colors.azreg : colors.black,
              }}
            />
          ),
          tabBarActiveTintColor: colors.azreg,
          tabBarInactiveTintColor: colors.black,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
