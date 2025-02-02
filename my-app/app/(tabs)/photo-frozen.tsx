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

});

export default PhotoReelScreen;