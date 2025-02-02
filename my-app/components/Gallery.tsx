// import { useState, useEffect } from "react";
// import { View, Image, Button, FlatList, StyleSheet } from "react-native";

// type GalleryScreenProps = {
//   photos: string[];
// };

// const GalleryScreen = ({ photos }: GalleryScreenProps) => {
//     const [showImages, setShowImages] = useState(true);

//   return (
//     <View style={styles.container}>
//     <Button
//         title={showImages ? "Hide Images" : "Show Images"}
//         onPress={() => setShowImages(!showImages)}
//       />
//       {showImages&&
//       <FlatList
//         data={photos}
//         keyExtractor={(item) => item}
//         renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
//       />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   image: { width: 200, height: 200, margin: 10 },
//   camera: {
//     width: '100%',
//     height: 300, // Set a fixed height for the camera view
//   },
// });

// export default GalleryScreen;


import { useState, useEffect } from "react";
import { View, Image, Button, FlatList, Text, StyleSheet } from "react-native";

type GalleryScreenProps = {
  photos: string[];
};

const GalleryScreen = ({ photos }: GalleryScreenProps) => {
  const [showImages, setShowImages] = useState(true);
  const [countdown, setCountdown] = useState(1 * 24 * 60 + 13); // Start with 1 day 13 minutes

  // Update the countdown every minute
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1); // Decrease by 1 minute every 60 seconds
      } else {
        clearInterval(timerInterval);
      }
    }, 60000); // Update every minute

    return () => clearInterval(timerInterval); // Cleanup on component unmount
  }, [countdown]);

  // Format the timer as "d h m"
  const days = Math.floor(countdown / 1440); // 1440 minutes in a day
  const hours = Math.floor((countdown % 1440) / 60); // Remaining hours
  const minutes = countdown % 60; // Remaining minutes

  return (
    <View style={styles.container}>
      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{`${days}d ${hours}h ${minutes}m`}</Text>
      </View>

      {/* Show/Hide Images Button */}
      <Button
        title={showImages ? "Hide Images" : "Show Images"}
        onPress={() => setShowImages(!showImages)}
      />

      {/* Image Gallery */}
      {showImages && (
        <FlatList
          data={photos}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  timerContainer: {
    marginBottom: 20,  // Adds spacing from the bottom
    justifyContent: "center",
    alignItems: "center",  // Centers the timer horizontally
    position: "absolute",  // Absolute positioning to place it at the bottom
    bottom: 308,  // Distance from the bottom of the screen
    width: "100%",
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9999BF",
  },
  image: { width: 200, height: 200, margin: 10 },
  camera: {
    width: "100%",
    height: 300, // Set a fixed height for the camera view
  },
});

export default GalleryScreen;
