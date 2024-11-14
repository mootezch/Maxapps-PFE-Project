import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";

export default function Example() {
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const contactInfo = {
    nom: "Mootez",
    prénom: "Chihi",
    téléphone: "54848179",
    Email: "mootez.chihi97@gmail.com",
    Adresse: "Avenue Bigo 5170 Chebba, Tunisie",
  };
  const decreaseHappiness = () => {
    setHappinessPercentage((prevPercentage) =>
      prevPercentage > 0 ? prevPercentage - 5 : prevPercentage
    );
  };
  const increaseHappiness = () => {
    setHappinessPercentage((prevPercentage) =>
      prevPercentage < 100 ? prevPercentage + 5 : prevPercentage
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.section}>
          <View style={styles.profile}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
            >
              <View style={styles.profileAvatarWrapper}>
                <Image
                  alt=""
                  source={require("../Bottontabs/images/profile image.jpg")}
                  style={styles.profileAvatar}
                />

                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                >
                  <View style={styles.profileAction}>
                    <FeatherIcon color="#fff" name="edit-3" size={15} />
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            <View>
              <Text style={styles.profileName}>Mootez Chihi</Text>

              <Text style={styles.profileAddress}>
                Avenue Bigo 5170 Chebba, Tunisie
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, styles.ticketSummarySection]}>
          <Text style={styles.sectionTitle}>Ticket Summary</Text>

          <View style={styles.ticketRow}>
            <View style={[styles.ticketBox, styles.ticketBoxMarginRight]}>
              <Text style={styles.ticketTitle}>Open</Text>
              <FeatherIcon name="message-circle" size={30} color="#32c759" />
              <Text style={styles.ticketCount}>10</Text>
            </View>
            <View style={[styles.ticketBox, styles.ticketBoxMarginRight]}>
              <Text style={styles.ticketTitle}>On Hold</Text>
              <FeatherIcon name="pause-circle" size={30} color="#fbbc05" />
              <Text style={styles.ticketCount}>5</Text>
            </View>
            <View style={styles.ticketBox}>
              <Text style={styles.ticketTitle}>Overdue</Text>
              <FeatherIcon name="alert-circle" size={30} color="#ff3838" />
              <Text style={styles.ticketCount}>3</Text>
            </View>
          </View>

          <View style={styles.ticketRow}>
            <View style={[styles.ticketBox1, styles.ticketBoxMarginRight]}>
              <Text style={styles.ticketTitle}>All Tickets</Text>
              <FeatherIcon name="twitch" size={30} color="#4b7bec" />
              <Text style={styles.ticketCount}>50</Text>
            </View>
            <View style={styles.ticketBox}>
              <Text style={styles.ticketTitle}>Happiness Rating</Text>
              <FeatherIcon name="smile" size={30} color="#6ab04c" />
              <Text style={styles.ticketCount}>85%</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          {/* Contact information section */}
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Contact Info</Text>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Nom:</Text>
              <Text style={styles.contactValue}>{contactInfo.nom}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Prénom:</Text>
              <Text style={styles.contactValue}>{contactInfo.prénom}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Téléphone:</Text>
              <Text style={styles.contactValue}>{contactInfo.téléphone}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactValue}>{contactInfo.Email}</Text>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Adresse:</Text>
              <Text style={styles.contactValue}>{contactInfo.Adresse}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  /** Profile */
  profile: {
    paddingVertical: 24,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatarWrapper: {
    position: "relative",
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  ticketBoxMarginRight: {
    marginRight: 10,
  },

  profileAction: {
    position: "absolute",
    right: -4,
    bottom: -10,
    alignItems: "center",
    justifyContent: "center",
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: "#007bff",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#414d63",
    textAlign: "center",
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: "#989898",
    textAlign: "center",
  },
  /** Ticket Summary Section */
  ticketSummarySection: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  ticketRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  ticketBox: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 6, // Add elevation for shadow effect on Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ticketBox1: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 6, // Add elevation for shadow effect on Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ticketCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  contactInfo: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  contactTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  contactLabel: {
    fontWeight: "bold",
    marginRight: 5,
  },
  contactValue: {
    flex: 1,
  },
});
