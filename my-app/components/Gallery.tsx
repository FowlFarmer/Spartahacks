import { useState, useEffect } from "react";
import { View, Image, Button, FlatList, StyleSheet } from "react-native";

type GalleryScreenProps = {
  photos: string[];
};

const GalleryScreen = ({ photos }: GalleryScreenProps) => {
    const [showImages, setShowImages] = useState(true);

  return (
    <View style={styles.container}>
    <Button
        title={showImages ? "Hide Images" : "Show Images"}
        onPress={() => setShowImages(!showImages)}
      />
      {showImages&&
      <FlatList
        data={photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 200, height: 200, margin: 10 },
  camera: {
    width: '100%',
    height: 300, // Set a fixed height for the camera view
  },
});

export default GalleryScreen;