import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import IMAGES from "./images";

function NotificationsTab(props) {
  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.NOTIFICATIONS}
        style={{
          height: 60,
          width: 60,
          tintColor: "gray",
          marginBottom: 20,
        }}
      />
      <Text style={styles.message}>
        You do not have any {"\n"} Notifications at the moment
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    textAlign: "center",
  },
});

export default NotificationsTab;
