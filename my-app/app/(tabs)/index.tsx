import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import CameraComponent from "@/components/Camera";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CameraComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
