import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import colors from "../constants/colors";
import { ScrollView } from "react-native-gesture-handler";

const TicketsScreen = ({ navigation }) => {
  const handleSendTicket = () => {
    // Navigate to the "Send Ticket" page
    navigation.navigate("SendTicket");
  };

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/papers.co-sm11-white-green-blur-gradation-41-iphone-wallpaper.jpg")}
        >
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Image
                source={require("../assets/search-2907.png")}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Recherche dans les Tickets"
                placeholderTextColor="#0a0a0a"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.ticketContainer}>
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketTitle}>How to we pull data..</Text>
              <Text style={styles.ticketDate}>March 19, 2024</Text>
            </View>
            <View style={styles.ticketBody}>
              <Text style={styles.ticketMessage}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.ticketFooter}>
              <Text style={styles.ticketStatus}>New</Text>
              <Text style={styles.ticketAssignedTo}>Assigned to: John Doe</Text>
              <View
                style={[styles.iconContainer, { backgroundColor: "red" }]}
              ></View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.ticketContainer}>
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketTitle}>Canned Response..</Text>
              <Text style={styles.ticketDate}>23h</Text>
            </View>
            <View style={styles.ticketBody}>
              <Text style={styles.ticketMessage}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.ticketFooter}>
              <Text style={styles.ticketStatus1}>Solved</Text>
              <Text style={styles.ticketAssignedTo}>Assigned to: John Doe</Text>
              <View
                style={[styles.iconContainer1, { backgroundColor: "green" }]}
              ></View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSendTicket}>
            <Image
              source={require("../assets/10238004.png")}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <Image
            source={require("../assets/faza.png")}
            style={[styles.imageStyle, { transform: [{ scaleX: -0.92 }] }]}
          />
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.azreg,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    margin: 10,
  },
  ticketFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  ticketStatus: {
    backgroundColor: "#ffff3f",
    borderRadius: 5,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  ticketStatus1: {
    backgroundColor: "#aacc00",
    borderRadius: 5,
    paddingHorizontal: 20,
    marginRight: 20,
  },
  ticketAssignedTo: {
    backgroundColor: "#d9d9d9",
    textAlign: "center",
    paddingHorizontal: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    left: 40,
  },
  iconContainer1: {
    width: 20,
    height: 20,
    borderRadius: 10,
    left: 25,
  },

  input: {
    width: 288,
    height: 40,
    color: "#02040f",
    paddingLeft: 24,
    borderColor: "black",
  },
  ticketContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
    width: "95%",
    margin: 10,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ticketDate: {
    fontSize: 14,
    color: "#666",
  },
  ticketBody: {},
  ticketMessage: {
    fontSize: 16,
  },
  imageStyle: {
    width: 188,
    height: 165,
    bottom: -17,
    left: -175,
  },
  button: {
    position: "absolute",
    bottom: 60,
    right: 35,
  },
  buttonIcon: {
    width: 50,
    height: 50,
  },
});

export default TicketsScreen;
