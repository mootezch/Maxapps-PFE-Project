import React, { useState } from "react";
import {
  createBottomTabNavigator,
  useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView, // Import ScrollView
} from "react-native";
import colors from "../constants/colors";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const SendTicket = () => {
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigation(); // Get navigation object

  const handleImportFile = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync();
      if (response.type === "success") {
        // Handle the selected file
        console.log(response.uri);
      }
    } catch (error) {
      console.error("Error picking document: ", error);
    }
  };

  const handleRetour = () => {
    navigation.navigate("Home"); // Navigate to HomeTab
  };

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../assets/papers.co-sm11-white-green-blur-gradation-41-iphone-wallpaper.jpg")}
        >
          <View style={styles.container1}>
            <View style={styles.inputContainer1}>
              <Text style={styles.text}>New Ticket</Text>
            </View>
          </View>
          <Image
            source={require("../assets/faza.png")}
            style={[styles.imageStyle, { transform: [{ scaleX: -0.92 }] }]}
          />

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.importButton}
              onPress={handleImportFile}
            >
              <MaterialIcons name="attach-file" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.retourButton}
              onPress={handleRetour}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, styles.objectInput]}
                placeholder="Object"
                value={object}
                onChangeText={(text) => setObject(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.messageInputContainer}>
                <TextInput
                  style={[styles.input, styles.messageInput]}
                  placeholder="Start typing your message..."
                  multiline={true}
                  numberOfLines={5}
                  maxLength={5000}
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                />
                <Text
                  style={styles.characterCount}
                >{`${message.length}/5000`}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => handleSend()}
            >
              <Text style={styles.sendButtonText}>SEND</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  container1: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.azreg,
  },
  text: {
    flex: 1,
    color: "#02040f",
    marginLeft: 10,
    fontSize: 16,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    width: "100%",
    marginBottom: 5,
  },
  messageInputContainer: {
    position: "relative",
    width: "100%",
  },
  characterCount: {
    position: "absolute",
    bottom: 15,
    right: 16,
    color: "#777", // Adjust color as needed
  },
  importButton: {
    padding: 10,
    marginBottom: 30,
    right: -160,
    marginTop: -25,
    backgroundColor: colors.primary,
    opacity: 0.8,
    borderRadius: 65,
    transform: [{ rotate: "90deg" }],
  },
  retourButton: {
    padding: 10,
    marginBottom: 30,
    right: 160, // Adjust positioning as needed
    marginTop: -72, // Adjust positioning as needed
    backgroundColor: colors.primary,
    opacity: 0.8,
    borderRadius: 65,
  },
  inputContainer1: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    width: "100%", // Make input take full width
  },
  objectInput: {
    marginBottom: 20,
    marginTop: 20, // Increase margin for object input
  },
  messageInput: {
    height: 250,
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: colors.azreg,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 150,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageStyle: {
    position: "absolute",
    width: 188,
    height: 162,
    bottom: -20,
    left: -59,
  },
});

export default SendTicket;
