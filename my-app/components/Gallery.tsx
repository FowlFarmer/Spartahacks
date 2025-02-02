import { useState, useEffect } from "react";
import { View, Image, Button, FlatList, Text, StyleSheet, ImageBackground } from "react-native";

type GalleryScreenProps = {
  photos: string[];
};

const GalleryScreen = ({ photos }: GalleryScreenProps) => {
  const [showImages, setShowImages] = useState(false);  // Initially set to false, images are hidden
  const [countdown, setCountdown] = useState(1 * 24 * 60 + 13); // Start with 1 day 13 minutes

  // Update the countdown every minute
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1); // Decrease by 1 minute every 60 seconds
      } else {
        clearInterval(timerInterval);
      }
    }, 1000); // Update every minute

    return () => clearInterval(timerInterval); // Cleanup on component unmount
  }, [countdown]);

  // Format the timer as "d h m"
  const days = Math.floor(countdown / 1440); // 1440 minutes in a day
  const hours = Math.floor((countdown % 1440) / 60); // Remaining hours
  const minutes = countdown % 60; // Remaining minutes

  return (
    <View style={styles.container}>
      {/* Conditional rendering of the countdown when showImages is false */}
      {!showImages && (
        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{`${days}d ${hours}h ${minutes}m`}</Text>
        </View>
      )}

      {/* Show/Hide Images Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={showImages ? "Hide Images" : "Show Images"}
          onPress={() => setShowImages(!showImages)}  // Toggle the visibility of images
        />
      </View>

      {/* Conditional rendering of background and gallery when showImages is true */}
      {showImages && (
        <ImageBackground
          source={require('@/assets/images/filmstrip.png')}  // Background image path
          style={styles.background}
        >
          {/* Image Gallery */}
          <FlatList
            data={photos}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
          />
        </ImageBackground>
      )}

      {/* Additional Bottom Buttons */}
      <View style={styles.bottomButtonContainer}>
        <Button title="Another Button" onPress={() => console.log("Another button pressed")} />
        {/* Add more buttons here if needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  timerContainer: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",  // Absolute positioning to place it at the top
    top: 407,  // Adjusted distance from the top of the screen
    width: "100%",
  },

  background: {
    flex: 1,  // Makes sure the background takes up the entire space
    justifyContent: "center",
    alignItems: "center",
    resizeMode: 'cover',
    width: '100%',
  },

  timer: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9999BF",
  },
  image: { width: 200, height: 200, margin: 10 },
  buttonContainer: {
    position: "absolute",
    bottom: 160,  // Position the "Show Images" button 150 units from the bottom
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,  // Ensures the button is above other elements
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 10,  // Position additional buttons near the bottom
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,  // Ensures these buttons appear on top of other elements
  },
});

export default GalleryScreen;
