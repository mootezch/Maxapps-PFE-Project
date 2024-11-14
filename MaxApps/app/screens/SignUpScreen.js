import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import colors from "../constants/colors";
import { FontAwesome } from '@expo/vector-icons';

const RequestSended = ({ route, navigation }) => {
  const { email } = route?.params ?? "";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const handleSignUp = () => {
    console.log("Submitted username:", username);
    console.log("Submitted password:", password);
    console.log("Submitted mobile:", mobile);
    console.log("Submitted address:", address);
    navigation.navigate("WelcomeScreen");
  };

  const handleLogIn = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/papers.co-sm11-white-green-blur-gradation-41-iphone-wallpaper.jpg")}
    >
      <View style={styles.container}>
        <Image source={require("../assets/faza.png")} style={styles.logo} />
        <Text style={[styles.heading, { marginTop: 20 } ]}>Create account</Text>

        <View style={styles.inputContainer}>
          <View style={[styles.input, { marginTop: 30 } ]}>
            <FontAwesome name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
            <TextInput
              style={styles.inputText}
              placeholder="Username"
              placeholderTextColor={colors.gray}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.input}>
            <FontAwesome name={"envelope"} size={22} color={"#9A9A9A"} style={styles.inputIcon}/>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor={colors.gray}
              //onChangeText={setEmail}
            />
          </View>

          <View style={styles.input}>
            <FontAwesome name={"lock"} size={24} color={"#9A9A9A"} style={styles.inputIcon}/>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor={colors.gray}
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.input}>
            <FontAwesome name={"phone"} size={24} color={"#9A9A9A"} style={styles.inputIcon}/>
            <TextInput
              style={styles.inputText}
              placeholder="Mobile"
              placeholderTextColor={colors.gray}
              onChangeText={setMobile}
            />
          </View>

          <View style={styles.input}>
            <FontAwesome name={"address-card"} size={24} color={"#9A9A9A"} style={styles.inputIcon}/>
            <TextInput
              style={styles.inputText}
              placeholder="Address"
              placeholderTextColor={colors.gray}
              onChangeText={setAddress}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={handleLogIn}>
              <Text style={styles.signupButton}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 188,
    height: 186,
    position: "absolute",
    top: 20,
    left: 280,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 31,
    color: colors.black,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 46,
    borderRadius: 14,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    height: "100%",
    color: colors.black,
  },
  button: {
    width: "80%",
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    marginBottom: 20,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  signupText: {
    fontSize: 16,
    color: colors.black,
    marginRight: 5,
  },
  signupButton: {
    fontSize: 16,
    color: colors.azre9,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default RequestSended;
