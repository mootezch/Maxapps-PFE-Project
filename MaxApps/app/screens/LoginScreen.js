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
import FontAwesome from "react-native-vector-icons/FontAwesome";


const LoginScreen = ({ route, navigation }) => {
  const { email } = route?.params ?? "";
  const [verificationCode, setVerificationCode] = useState("");
  const [codeInput, setCodeInput] = useState(""); // State for the verification code input

  const handleEmailSubmit = () => {
    console.log("Submitted email:", email);
    console.log("Submitted verification code:", verificationCode);
    navigation.navigate("WelcomeScreen");
  };

  const handleLogIn = () => {
    console.log("Log In button pressed");
    navigation.navigate("Tabs");
  };

  const handleSignUp = () => {
    console.log("Sign up button pressed");
    navigation.navigate("SignUpScreen");
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/papers.co-sm11-white-green-blur-gradation-41-iphone-wallpaper.jpg")}
    >
      <View style={styles.container}>
            <Image source={require("../assets/faza.png")} style={styles.logo} />
      <View style={styles.infoContainer}>
  <View style={styles.helloContainer}>
    <Text style={styles.helloText}>Hello</Text>
  </View>
  <Text style={styles.infoText}>Sign in to your account</Text>
</View>



        <View style={styles.inputContainer}>
        <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              placeholderTextColor={colors.gray}
              //onChangeText={setEmail}
            />
          </View>
         
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              placeholderTextColor={colors.gray}
              secureTextEntry
              //onChangeText={setPassword}
            />
          </View>
          
        </View>
        <TouchableOpacity style={[styles.loginButton, { marginTop: 60 }]} onPress={handleLogIn}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signupButton}>SignUp</Text>
        </TouchableOpacity>
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
    paddingBottom: 20,
  },
  logo: {
    width: 188,
    height: 186,
    position: "absolute",
    top: 20,
    left: 280,
    resizeMode: "contain",
  },
  infoContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  
  helloContainer: {
    marginBottom: 10, // Add margin bottom to create space between the texts
  },
  
  helloText: {
    fontSize: 44, // Increase the font size for "Hello"
    color: colors.black,
    textAlign: "center",
    marginBottom: 5, // Add marginBottom to create space between the texts
    fontWeight: "bold",

  },
  
  infoText: {
    fontSize: 16, // Keep the font size for "Sign in to your account"
    color: colors.black,
    textAlign: "center",
  },
  
  inputText: {
    paddingLeft: 16,
    width: "100%",
    height: 46,
    borderRadius: 14,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    color: colors.black
  },
  heading: {
    fontSize: 24,
    color: colors.white,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    width: "80%",
  },
  
  input: {
    paddingLeft: 40,
    width: "100%",
    height: 46,
    borderRadius: 14,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    marginBottom: 20,
  },
  loginButton: {
    width: "80%",
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    marginBottom: 20,
    alignSelf: "center", // Align the button to the center horizontally
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
  inputIcon: {
    position: "absolute",
    top: 12,
    left: 12,
  },
});

export default LoginScreen;
