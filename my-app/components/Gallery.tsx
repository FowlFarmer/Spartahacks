import { useState, useEffect } from "react";
import { View, Image, FlatList, StyleSheet } from "react-native";

type GalleryScreenProps = {
  photos: string[];
};

const GalleryScreen = ({ photos }: GalleryScreenProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 200, height: 200, margin: 10 },
});

export default GalleryScreen;