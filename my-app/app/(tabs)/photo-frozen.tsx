// import React, { useState, useEffect } from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// // Placeholder for the bottom navigation icons (You can use actual icons or images)
// // const heartIcon = require("./assets/icons/hearticon.svg");
// // const logoIcon = require("./assets/icons/FFLogo.svg");
// // const gridIcon = require("./assets/icons/dashboardicon.svg");
// //const profileImage = require("./assets/profile.jpg"); // Your profile image path

// const PhotoReelScreen = () => {
//   // State for countdown timer (you can use an actual countdown function here)
//   const [countdown, setCountdown] = useState("1d 13m");

//   useEffect(() => {
//     // Logic to update countdown can go here (like using setInterval to update every second)
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Header /}
//       <View style={styles.header}>
//         <Text style={styles.title}>Photo Reel</Text>
//         <Image source={profileImage} style={styles.profileImage} />
//       </View>

//       {/ Main Content /}
//       <View style={styles.mainContent}>
//         <Text style={styles.developingText}>Your photos are developing...</Text>
//         <View style={styles.filmReel}>
//           <Text style={styles.unfreezeText}>Unfreeze in:</Text>
//           <Text style={styles.timerText}>{countdown}</Text>
//         </View>
//         <TouchableOpacity>
//           <Text style={styles.albumsLink}>View albums</Text>
//         </TouchableOpacity>
//       </View>

//       {/ Bottom Navigation */}
//       <View style={styles.bottomNav}>
//         {/* <TouchableOpacity>
//           <Image source={heartIcon} style={styles.icon} />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image source={flowerIcon} style={styles.centerIcon} />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image source={gridIcon} style={styles.icon} />
//         </TouchableOpacity> */}
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({

// });

// export default PhotoReelScreen;


import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";

// Placeholder for the profile image (ensure this exists in your assets folder)
const backgroundImage = require('@/assets/images/albumpage.png'); // Replace with your full-screen image

const PhotoReelScreen = () => {
  // State for countdown timer (you can use an actual countdown function here)
  const [countdown, setCountdown] = useState("1d 13m");

  useEffect(() => {
    // Logic to update countdown can go here (like using setInterval to update every second)
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <ImageBackground source={backgroundImage} style={styles.bgImage}>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          {/* Add any bottom navigation icons if needed */}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },  // Ensures the container takes up full screen
  bgImage: {
    flex: 1,
    resizeMode: 'cover',  // Ensures the image covers the entire screen
    justifyContent: 'center',  // Centers content vertically
    alignItems: 'center',  // Centers content horizontally
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    zIndex: 1,  // Ensures header is on top of the background image
  },

  filmReel: {
    marginTop: 20,
    alignItems: 'center'
  },

  albumsLink: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    zIndex: 1,  // Ensures the bottom navigation is on top of the background
  },
});

export default PhotoReelScreen;
