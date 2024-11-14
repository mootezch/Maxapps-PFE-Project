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
import colors from "../../constants/colors";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

const projects = [
  {
    id: 1,
    projectName: 'Project 1',
    description: 'Description of Project 1',
    deadline: '2024-06-01',
    status: 'In Progress',
    image: require("../../assets/favicon.png"), // Example image import
    backgroundColor: "#FFFFFF", // Background color changed to white
  },
  {
    id: 2,
    projectName: 'Project 2',
    description: 'Description of Project 2',
    deadline: '2024-06-15',
    status: 'Pending',
    image: require("../../assets/favicon.png"), // Example image import
    backgroundColor: "#FFFFFF", // Background color changed to white
  },
  // Add more projects as needed
];

const HomeTab = () => {
  const navigation = useNavigation(); // Hook to access navigation
  const handleNavigateToProject = (projectId) => {
    // Navigate to the TicketsScreen with the projectId parameter
    navigation.navigate("TicketsScreen", { projectId: projectId });
  };

  return (
    <KeyboardAvoidingView
      style={styles.background}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground
          style={styles.background}
          source={require("../../assets/papers.co-sm11-white-green-blur-gradation-41-iphone-wallpaper.jpg")}
        >
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Image
                source={require("../../assets/search-2907.png")}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Search in projects"
                placeholderTextColor="#0a0a0a"
              />
            </View>
          </View>

          {projects.map((project) => (
            <TouchableOpacity
              key={project.id}
              style={[styles.projectContainer, { backgroundColor: project.backgroundColor, marginTop: project.id === 1 ? 10 : 0 }]}
              onPress={() => handleNavigateToProject(project.id)} // Pass projectId to the handler
            >
              <View style={styles.projectDetails}>
                <Text style={styles.projectName}>{project.projectName}</Text>
                <Text style={styles.description}>{project.description}</Text>
                <Text style={styles.deadline}>Deadline: {project.deadline}</Text>
                <Text style={styles.status}>Status: {project.status}</Text>
              </View>
              <Image source={project.image} style={styles.projectImage} />
              <Image source={require("../../assets/arrow.png")} style={styles.arrowIcon} />
            </TouchableOpacity>
          ))}

          <Image
            source={require("../../assets/faza.png")}
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
  input: {
    width: 288,
    height: 40,
    color: "#02040f",
    paddingLeft: 24,
    borderColor: "black",
  },
  imageStyle: {
    width: 188,
    height: 165,
    bottom: -87,
    left: -175,
  },
  projectContainer: {
    flexDirection: "row",
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  projectImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  projectDetails: {
    flex: 1,
    marginRight: 15,
  },
  projectName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
  },
  deadline: {
    fontSize: 12,
    color: "#666",
  },
  status: {
    fontSize: 12,
    color: "#666",
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});

export default HomeTab;
