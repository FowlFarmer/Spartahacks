import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// Placeholder for the bottom navigation icons (You can use actual icons or images)
// const heartIcon = require("./assets/icons/hearticon.svg");
// const logoIcon = require("./assets/icons/FFLogo.svg");
// const gridIcon = require("./assets/icons/dashboardicon.svg");
//const profileImage = require("./assets/profile.jpg"); // Your profile image path

const PhotoReelScreen = () => {
  // State for countdown timer (you can use an actual countdown function here)
  const [countdown, setCountdown] = useState("1d 13m");

  useEffect(() => {
    // Logic to update countdown can go here (like using setInterval to update every second)
  }, []);

  return (
    <View style={styles.container}>
      {/* Header /}
      <View style={styles.header}>
        <Text style={styles.title}>Photo Reel</Text>
        <Image source={profileImage} style={styles.profileImage} />
      </View>

      {/ Main Content /}
      <View style={styles.mainContent}>
        <Text style={styles.developingText}>Your photos are developing...</Text>
        <View style={styles.filmReel}>
          <Text style={styles.unfreezeText}>Unfreeze in:</Text>
          <Text style={styles.timerText}>{countdown}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.albumsLink}>View albums</Text>
        </TouchableOpacity>
      </View>

      {/ Bottom Navigation */}
      <View style={styles.bottomNav}>
        {/* <TouchableOpacity>
          <Image source={heartIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={flowerIcon} style={styles.centerIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={gridIcon} style={styles.icon} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c2b",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: "#dcdcf0",
    fontSize: 28,
    fontWeight: "600",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  developingText: {
    color: "#dcdcf0",
    fontSize: 20,
    marginBottom: 20,
  },
  filmReel: {
    width: 200,
    height: 150,
    backgroundColor: "#2c2c3b",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  unfreezeText: {
    color: "#dcdcf0",
    fontSize: 18,
  },
  timerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },
  albumsLink: {
    color: "#99aaff",
    fontSize: 16,
    textDecorationLine: "underline",
    marginTop: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
    backgroundColor: "#1c1c2b",
  },
  icon: {
    width: 28,
    height: 28,
  },
  centerIcon: {
    width: 40,
    height: 40,
  },
});

export default PhotoReelScreen;