import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Button, Text, StyleSheet, SafeAreaView } from "react-native";
import CameraComponent from "@/components/Camera";
import GalleryScreen from "@/components/Gallery";
const Tab = createBottomTabNavigator();



export default function App() {
  const [isCamera, setIsCamera] = useState(true);
  const [photos, setPhotos] = useState<string[]>([]);

  const handlePhotoTaken = (uri: string) => {
    setPhotos((prev) => [...prev, uri]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button
        title={isCamera ? "Go to Gallery" : "Open Camera"}
        onPress={() => setIsCamera(!isCamera)}
      />
      {isCamera && <CameraComponent onPhotoTaken={handlePhotoTaken} />}
      {!isCamera && <GalleryScreen photos={photos} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, },
  text: { fontSize: 24, fontWeight: "bold" },
  subtext: { fontSize: 16, color: "gray", marginTop: 10 },
});
