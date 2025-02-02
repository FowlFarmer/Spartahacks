import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import CameraComponent from "@/components/Camera";
import GalleryScreen from "@/components/Gallery";
const Tab = createBottomTabNavigator();

// Home Screen Component
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Camera App 📸</Text>
      <Text style={styles.subtext}>Capture and view your photos easily.</Text>
    </View>
  );
};

export default function App() {
  const [photos, setPhotos] = useState<string[]>([]);

  const handlePhotoTaken = (uri: string) => {
    setPhotos((prev) => [...prev, uri]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CameraComponent onPhotoTaken={handlePhotoTaken} />
      {<GalleryScreen photos={photos} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, },
  text: { fontSize: 24, fontWeight: "bold" },
  subtext: { fontSize: 16, color: "gray", marginTop: 10 },
});
